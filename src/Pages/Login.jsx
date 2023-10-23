import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/style.css";

function Login() {
    const { register,  handleSubmit, watch, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    
    const sendData = async (data) => {
        try{
            let res = await axios.post("http://192.168.29.151:3200/api/auth/login", data);
            let userData = res.data.user;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("chatbot-user", JSON.stringify(userData));
            navigate("/chatbotUI");
        }catch(error){
            console.log(error);
        }
    }
 
    return (
        <div>
            <br/><br/><br/><br/><br/>
            <div>
                <center><h2>Please Login here</h2></center>
                <form onSubmit={handleSubmit(sendData)} id="loginForm">

                    <div className='input-div'>
                        <input type="email" id="email" {...register('email', { required: true })} placeholder='Enter your email' />
                        {errors.email && <p>--- email is required ---</p>}
                    </div>

                    <div className='input-div'>
                        <input type="password" id="password" {...register('password', { required: true })} placeholder='Enter your password' />
                        {errors.password && <p>--- password is required ---</p>}
                    </div>
                    <p>Don't have account? <a href="/register">SignUp</a></p>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login;
