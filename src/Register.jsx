import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register () {
  const navigate = useNavigate();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
      setRegister({
        ...register,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register);

        try {
            const response = await axios.post('http://localhost:8080/api/users/addUser', register);
            console.log(response.data);
            alert("User added successfully");
            navigate("/Login");
       } catch (error) {
            console.log(error);
       }
    };
    
    return (
       <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <label>Name:</label>
            <input type="text" name="name" placeholder="Enter your name" value={register.name} onChange={handleChange} />
            

            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter your email" value={register.email} onChange={handleChange} />
            

            <label>Password:</label>
            <input type="password" name="password" placeholder="Enter your password" value={register.password} onChange={handleChange} />
            

            <button type="submit">Register</button>
          </form>
       </div>
    );
}

export default Register;
