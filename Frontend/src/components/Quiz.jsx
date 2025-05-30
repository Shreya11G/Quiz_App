import React from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'

const Quiz = () => {

   
        const {category}=useParams();
        const [questions,setQuestions]=useState([]);
        const [currentQuestion,setCurrentQuestion]=useState(0);
        const[score,setScore]=useState(0)
        const[showResult,setShowResult]=useState(false);
        const[correctAnswers,setCorrectAnswers]= useState(0);
        const[wrongAnswers,setWrongAnswers]= useState(0);
        const [loading, setLoading]= useState(true);
        const navigate=useNavigate();

        useEffect(()=>{
            const fetchQuestions =async ()=>{
                const res= await axios.get(`http://localhost:5000/questions/${category}`)
                setQuestions(res.data)
                setLoading(false);
            }
            fetchQuestions();
        },[category])
        if (loading) return <div>Loading...</div>;

const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    const nextQuestion = currentQuestion + 1;

    if (isCorrect) {
        const updatedCorrect = correctAnswers + 1;
        setScore(score + 1);
        setCorrectAnswers(updatedCorrect);

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
            saveProgress(updatedCorrect, wrongAnswers);
        }
    } else {
        const updatedWrong = wrongAnswers + 1;
        setWrongAnswers(updatedWrong);

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
            saveProgress(correctAnswers, updatedWrong);
        }
    }
};


const restartQuiz=()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    navigate('/dashboard')
}

const saveProgress=async (correctAnswers,wrongAnswers)=>{
   try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/save-progress', {
      category,
      correctAnswers,
      wrongAnswers,

    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Error saving progress:", err.response?.data || err.message);
  }
}
    
  return (
    <div className='quiz-container'>
        {showResult ?(

        <div className="result-section">
            <h1>Your Score:{score}</h1>
            <button className='restart-btn' onClick={restartQuiz}>Restart Quiz</button>
        </div>
        ):(

        <div className="question-section">
           {questions.length>0 &&(
            <>
                <h1 className="question-text">{questions[currentQuestion].question}</h1>
               <div className="options-container">
                    {questions[currentQuestion].options.map((option,index)=>(
                    
                        <button key={index} className="option-btn" onClick={()=>handleAnswerOptionClick(option)}>{option}</button>
                    ))}
                </div>
             </>
           )}
        </div>
        )}
    </div>
  )
}

export default Quiz;
