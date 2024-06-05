import axios from "./axios/axiosConfig";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Edit() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const headingText = "Edit";
    const description = "Enter your information to update an account"

    return (
        <div>
            <SignupCard heading={headingText} desc={description} 
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            password={password} setPassword={setPassword} />
        </div>
    )

}

const SignupCard = ({ heading, desc, firstName, setFirstName, lastName, setLastName, password, setPassword }) => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please Sign up")
            navigate("/signup")
            return
        }
    },[])


    const handleEdit = () => {
        const userId = localStorage.getItem("userId")
        axios.put("/user/edit", {
            _id:userId,
            firstName: firstName,
            lastName: lastName,
            password: password
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(
            navigate("/dashboard")
        )
    };
    return (
    <div>
        <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
            <div className="bg-white p-4 w-80 rounded-lg border-black">
                <div className="text-3xl font-bold text-center p-4">{heading}</div>
                <div className="text-center" >{desc}</div>
                <div className="p-4 rounded-lg font-bold" >
                    <div >First Name</div>
                    <div className="mt-2 mb-2" > <input type="text" placeholder="John" onChange={(e) => setFirstName(e.target.value)} /> </div>

                    <div>Last Name</div>
                    <div className="mt-2 mb-2" > <input type="text" value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)} /> </div>

                    <div>Password</div>
                    <div className="mt-2 mb-2" > <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /> </div>
                </div>
                <div className="rounded-lg bg-green-500 text-white font-bold text-center cursor-pointer p-2" onClick={handleEdit}> Update </div>
            </div>
        </div>
    </div>
    );
};