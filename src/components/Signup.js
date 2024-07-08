
import React, {useState} from 'react'
import { Router, useNavigate } from 'react-router-dom'

const  Signup=(props)=> {
    const [credentials, setCredentials] = useState({name: "",email: "", password: ""}) 
    let navigate = useNavigate();
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("https://check-vrss.onrender.com/api/auth/saveData", {
            
            method: 'POST',


            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
        const json = await response.json()
        console.log(json);
        
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
           
            navigate("/home");
        }
         else{
             alert("Invalid credentials");
         }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };


































  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
      <div className="mb-3">
  <label htmlFor="exampleInputName1" className="form-label">Name</label>
  <input type="text" className="form-control" onChange={onChange} id="name" name="name" value={credentials.name} 
  
  
aria-describedby="nameHelp" />
  
</div>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name="email" value={credentials.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" name="password" value={credentials.password}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>



    </div>
  )
}
export default Signup
