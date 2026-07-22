import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Login = () => {
  const[cridential,setCridential]=useState({email:"",password:""});
 let Navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:cridential.email,password:cridential.password})
      
    });
    
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
    Navigate("/")

    }
    else
    {
      alert("Invalid credeentials");
    }
  };
const onChange=(e)=>{
  setCridential({...cridential,[e.target.name]:e.target.value})
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={cridential.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input type="password" className="form-control" value={cridential.password} id="password" name="password" onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;