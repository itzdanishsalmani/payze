import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const headingText = "Sign In";
    const description = "Enter your credentials to access your account"

    return (
        <div>
            <SigninCard heading={headingText} desc={description} 
            username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword}
             />
        </div>
    )
}

const SigninCard = ({ heading,desc,username,password, setUsername, setPassword })=>{
    const navigate = useNavigate()

    const handleSignIn = () => {
        axios.post("http://localhost:7000/api/v1/user/signin", {
            username: username,
            password: password
        })
        .then(response => {
            if(response){
                const token = response.data.token;
                const userId = response.data.userId;
                localStorage.setItem("token",token)
                localStorage.setItem("userId",userId)
                navigate("/dashboard")
            }
        })
        .catch(error => {
            console.error("There was an error signing up!", error);
        });
    };
    return ( <div>
     <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-4 w-80 rounded-lg border-black">
        <div className="text-3xl font-bold text-center p-4">{heading}</div>
        <div className="text-center" >{desc}</div>
        <div className="p-4 rounded-lg font-bold" >
           
        <div>Email</div>
            <div className="mt-2 mb-2" > <input type="text" value={username} placeholder="johndoe@example.com" onChange={(e)=>setUsername(e.target.value)} /> </div>
            <div>Password</div>
            <div className="mt-2 mb-2" > <input type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)} /> </div>
        </div>
        <div className="rounded-lg bg-black text-white font-bold text-center cursor-pointer p-2" onClick={handleSignIn} >Sign In</div>
        <div className="m-2"> Already have an account? <span className="underline m-2 cursor-pointer" onClick={()=>{
            navigate("/signup")
        }} >Sign Up</span></div>
    </div>
    </div>
    </div>
)}