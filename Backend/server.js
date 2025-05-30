require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const app= express();
const PORT = process.env.PORT || 5000;
const cors= require('cors');
const jwt=require('jsonwebtoken');
const secret='2953add3a41fe1524b08c1d2049dc5f59b9f12cfe6a98d64758e20f063721ae4e8ce5f4fb14409fdbcfbe4cae849ba831c19236ab1018f878cb4a0b7534112ed'
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:String
})
const questionSchema = new mongoose.Schema({
    question:String,
    options:[String],
    answer: String,
    category:String
})

const Question = mongoose.model('Question', questionSchema)
app.post('/add-question',async(req,res)=>{
      try {
          const { question, options, answer, category } = req.body;
          if (!question || !options || !answer || !category) {
              return res.status(400).send('All fields are required');
          }
          
          if (!Array.isArray(options) || options.length < 2) {
              return res.status(400).send('Options must be  at least 2 items');
            }
            const newQuestion = new Question({ question, options, answer, category });
        await newQuestion.save();
        res.send('Question added');
    } catch (err) {
        console.error('Error saving question:', err);
        res.status(500).send('Internal Server Error');
    }
})

const User=mongoose.model('User',userSchema)
const bcrypt = require('bcrypt');

app.post('/register',async (req,res)=>{
    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).send('Username and password cannot be empty');
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send('User registered');
  } catch (error) {
    console.error('Register Fail', error);
    res.status(500).send('Error Registering User');
  }
})

app.post('/login',async(req,res)=>{
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password cannot be empty');
  }
    try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({message:'Incorrect username or password'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message:'Incorrect password. Try again.'});
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }

})

app.get('/questions/:category',async (req,res)=>{
    try{
        const{category}= req.params;
        const questions= await Question.find({category})
        res.json(questions);
    } catch (err){
        console.error('Error fetching questions by category:', err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/questions',async(req,res)=>{
    try{
        const questions= await Question.find();
        res.json(questions)
    } catch (err){
        console.error('Error fetching Error',err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/categories',async (req,res)=>{
    try{
        const categories=await Question.distinct('category')
        res.json(categories);
    } catch (err){
        console.error('Error fetching Error',err);
        res.status(500).send('Internal Server Error');
    }
})

const progressSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    category:String,
    correctAnswers:Number,
    wrongAnswers:Number
})
const Progress =mongoose.model('Progress',progressSchema)

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,secret,(err,decoded)=>{
            if(err){

                return res.status(401).send('Unauthorized')
            }else{
                req.userId=decoded.userId
                next();
            }
        });
    }else{
        res.status(404).send('Access Denied')
    }
}

app.post('/save-progress', authenticate ,async(req,res)=>{
    const {category,correctAnswers,wrongAnswers}=req.body;
    const progress=new Progress({
        userId:req.userId,
        category,
        correctAnswers,
        wrongAnswers
    })
    await progress.save()
    res.send('Progress saved')
})


app.get('/progress' ,authenticate, async(req,res)=>{
    const progress= await Progress.find({userId:req.userId})
    res.json(progress)
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})