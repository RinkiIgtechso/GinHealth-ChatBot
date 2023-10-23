import { io } from 'socket.io-client';

const token = localStorage.getItem("token")

const URL = 'http://192.168.29.151:3200/';

localStorage.setItem('debug', '*');

export const socket = io(URL,{
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
});

socket.connect();
socket.on("connect",()=>{console.log("connected")})