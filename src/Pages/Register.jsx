import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const { register,  handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    const sendData = async (data) => {
       try{
        let res = await axios.post("http://192.168.29.151:3200/api/auth/register", data);
        if(res.data){
            navigate("/login");
        }
       }catch(error){
        console.log(error);
       }       
    }

  return (
    <div>
        <br/><br/><br/><br/><br/>
        <div>
            <center><h2>Please Register here</h2></center>
            <form onSubmit={handleSubmit(sendData)} id="register-form">

                <div className='input-div'>
                  <input type="text" id="name" {...register('name', { required: true })} placeholder='Enter your name' />
                  {errors.name && <p>--- Name is required. ---</p>}
                </div>

                <div className='input-div'>
                  <input type="email" id="email" {...register("email", { required: true, validate: {  maxLength: (v) =>  v.length <= 50 || "The email should have at most 50 characters",  matchPattern: (v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"},})} placeholder='Enter your email' />
                  {errors.email && <p>--- Email is required. ---</p>}
                </div>

                <div className='input-div'>
                  <input type="password" id="password" {...register('password', { required: true })} placeholder='Enter your password' />
                  {errors.password && <p>--- Password is required. ---</p>}
                </div>

                <input type="submit" />
            </form>
        </div>
    </div>
  )
}

export default Register;
