import React, { useState } from 'react'
import axios from 'axios'; // work with api use this 

const AddQuestion = () => {

    const [question, setQuestion]= useState('');
    const [options,setOptions]=useState(['','','','']);
    const [answer, setAnswer]= useState('');
    const [category, setCategory]= useState('');

    const handleOptionChange =(index, value)=>{
        const newOptions=[...options];
        newOptions[index]=value;
        setOptions(newOptions);
    }

    const handleSubmit =async (e)=>{
        e.preventDefault(); //Stop page reload
      try {
      await axios.post('http://localhost:5000/add-question', {
        question,
        options,
        answer,
        category,
      });
      setQuestion('');
      setOptions(['', '', '', '']);
      setAnswer('');
      setCategory('');
    } catch (err) {
      console.error('Error adding question:', err);
    }
  }

  return (
    <div className='add-question-container'>
      <h1 className="title">Add Question</h1>
       <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <input 
            type="text" 
            className="input-field" 
            placeholder='Question'
            value={question}
            onChange={(e)=> setQuestion(e.target.value)}
            />
        </div>

        {options.map((option, index)=>(
            
        <div className="form-group" key={index}>
            <input 
            type="text" 
            className="input-field" 
            placeholder={`option ${index+1}`}
            value={option}
            onChange={(e)=> handleOptionChange(index, e.target.value)}
            />
        </div>
        ))}
        <div className="form-group">
            <input 
            type="text" 
            className="input-field" 
            placeholder='Answer'
            value={answer}
            onChange={(e)=> setAnswer(e.target.value)}
            />
        </div>
        <div className="form-group">
            <input 
            type="text" 
            className="input-field" 
            placeholder='Categary'
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            />
        </div>
        <button type='submit' className='submit-btn'>Add Question</button>
       </form>
    </div>
  )
}

export default AddQuestion
