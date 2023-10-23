import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ChatbotUI from "../Pages/ChatbotUI";

function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatbotUI" element={<ChatbotUI />} />
        </Routes>
    )
}

export default AllRoutes;