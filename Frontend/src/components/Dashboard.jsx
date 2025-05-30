import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState ,useEffect } from 'react'

const Dashboard = () => {
    const[categories,setCategories]= useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        // if(!token){
        //     navigate('/login')
        //     return;
        // }
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                });
                setCategories(res.data);
            } catch (err) {
                console.error('Fetch categories failed:', err);
                if (err.response?.status === 401) {
                // Token invalid or expired
                localStorage.removeItem('token');
                navigate('/login');
                }
            }
            };
        fetchCategories();
    },[token,navigate])
    const handleCategoryClick=(category)=>{
        navigate(`/quiz/${category}`) 
    }
  return (
    <div className='dashboard'>
      <h1 className="title">Quiz Categories</h1>
      <div className="category-grid">
        {categories.map((category)=>(

        <div className="category-card" key={category} onClick={()=>handleCategoryClick(category)}>
            <h2 className="category-name">{category}</h2>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
