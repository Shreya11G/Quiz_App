import React, { useEffect ,useState } from 'react'
import axios from 'axios'


const UserDashboard = () => {
    const[progress,setProgress]=useState([])
    useEffect(()=>{
        const fetchProgress=async()=>{
            const token =localStorage.getItem('token')
            try{
                const res=await axios.get('http://localhost:5000/progress',{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                })
                console.log(res.data);
                setProgress(res.data);
            }catch(error){
                console.error('Error Fetching Progress',error)
            }
        }
        fetchProgress()
    },[])
  return (
    <div>
      <div className="user-dashboard">
        <h1>Your Quiz Progress</h1>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Correct Answer</th>
                    <th>Wrong Answer</th>
                    <th>progress(%)</th>
                </tr>
            </thead>
            <tbody>
                {progress.map((item) => {
                     const total = item.correctAnswers + item.wrongAnswers;
                    const percentage = total
                        ? ((item.correctAnswers / total) * 100).toFixed(2)
                        : '0.00';
                    return(
                    <tr key={item._id}>
                        <td>{item.category}</td>
                        <td>{item.correctAnswers}</td>
                        <td>{item.wrongAnswers}</td>
                        <td>{percentage}%</td>
                       
                    </tr>
                    );
                })}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDashboard
