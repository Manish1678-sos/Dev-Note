import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [cridential, setCridential] = useState({name: "", email: "", password: "", cpassword: ""});
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name:cridential.name,email:cridential.email,password:cridential.password})
      
    });
    
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
    Navigate("/")
    props.showAlert("Account created successfully","success");

    }
    else
    {
      props.showAlert("Invalid creedentials","danger");
    }
  };
const onChange=(e)=>{
  setCridential({...cridential,[e.target.name]:e.target.value})
}
  return (
    <div classname="container">
      <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
   <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
