import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from "react-markdown";
import { IoSend } from "react-icons/io5";
import { generateRandomId } from './RandomIdGenerator';
import { socket } from '../socket';
import axios from  'axios';

function ChatbotUI() {
    const { register,  handleSubmit, reset, formState: { errors } } = useForm();
    const [message, setMessage] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploaded, setUploaded] = useState([]);
    const [userMessage, setUserMessage] = useState([]);
    const chatbotUser = JSON.parse(localStorage.getItem('chatbot-user'));
    const token = localStorage.getItem("token");

    const sendData = async (data) => {
        setMessage(true);
        let msg = data.message;
        setUserMessage((prev)=>[...prev, 
            {
                _id: generateRandomId(),
                message: msg
            }
        ]);
        try{
            if(uploaded){
                let sub_data = {...data, files:uploaded};
                socket.emit('message', sub_data);
                socket.emit('updatedMessage', sub_data);
            }else{
                socket.emit('message', data);
                socket.emit('updatedMessage', data);
            }
            reset({
                message: ""
            })
            // setUploaded([]);
            setUploadedFileName('')
        }catch(error){
            console.log(error);
        }
        
    }

    const handleUpload = async (e) =>{
        const formData = new FormData();
        formData.set("file",e.target.files[0])
        let headers = {
            headers: { 
                "authorization" : `Bearer ${token}`,    
                "Content-Type": "multipart/form-data"
            }
        }
        try{
            let res = await axios.post("http://192.168.29.151:3200/api/storage/file", formData, headers);
            let responses = res.data;
            if(responses){
                setUploadedFileName(responses.originalname)
                setUploaded(prev=>[...prev, responses._id]);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        socket.on('message', (value) => {
            console.log(value);
            if(value.sender==='Chatbot'){
                setUserMessage((prev)=>[...prev, {
                    _id: value._id,
                    message:value.message
                }]);
            }
        });
        socket.on('updatedMessage', (value) => {
            console.log(value);
        });
    },[])

    return (
        <div>
            <header>
                <center><h1>Welcome {chatbotUser.name} to ChatBot UI</h1></center>
            </header>
            <main>
                <div className='chatbot'>
                    <div className='message-box'>
                        {message?
                            <div>
                                {/* <div>
                                    {serverResponse?serverResponse.map((ele, index)=>
                                        <p key={index}>{ele}</p>
                                    ):""}
                                </div> */}
                                <div className='chat-message'>
                                    {userMessage?userMessage.map((ele, index)=>
                                        <div key={ele._id}>
                                            <div>
                                                <ReactMarkdown>{ele.message}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ):""}
                                </div>
                            </div>:
                            <div>
                                <br/>
                                <center>
                                    <p>No message...</p>
                                </center>
                                <br/><br/><br/>
                            </div>
                        }
                    </div>

                    <form onSubmit={handleSubmit(sendData)} className='chatbot-question'>
                        <input type="text" id="messages" {...register('message', { required: true })} placeholder='Enter your message...' />
                        <input type="file" id="file" onChange={(e)=>handleUpload(e)}/>
                        {uploadedFileName?<div className='uploaded'>{uploadedFileName}</div>:''}
                        <button><span><IoSend/></span></button>
                    </form>
                </div>
            </main>
        </div>
  )
}

export default ChatbotUI;
