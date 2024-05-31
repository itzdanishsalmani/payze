import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const headingText = "Sign Up";
    const description = "Enter your information to create an account"

    return (
        <div>
            <SignupCard heading={headingText} desc={description} firstName={firstName}
                setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
                username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        </div>
    )

}

const SignupCard = ({ heading, desc, firstName, setFirstName, lastName, setLastName, username, setUsername, password, setPassword }) => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        axios.post("http://localhost:7000/api/v1/user/signup", {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        })
    };
    return (<div>
        <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
            <div className="bg-white p-4 w-80 rounded-lg border-black">
                <div className="text-3xl font-bold text-center p-4">{heading}</div>
                <div className="text-center" >{desc}</div>
                <div className="p-4 rounded-lg font-bold" >
                    <div >First Name</div>
                    <div className="mt-2 mb-2" > <input type="text" value={firstName} placeholder="John" onChange={(e) => setFirstName(e.target.value)} /> </div>

                    <div>Last Name</div>
                    <div className="mt-2 mb-2" > <input type="text" value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)} /> </div>

                    <div>Email</div>
                    <div className="mt-2 mb-2" > <input type="text" value={username} placeholder="johndoe@example.com" onChange={(e) => setUsername(e.target.value)} /> </div>
                    <div>Password</div>
                    <div className="mt-2 mb-2" > <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /> </div>
                </div>
                <div className="rounded-lg bg-green-500 text-white font-bold text-center cursor-pointer p-2" onClick={handleSignUp}> Sign Up</div>
                <div className="m-2"> Already have an account? <span className="underline m-2 cursor-pointer" onClick={ navigate("/signin") }>Login</span></div>
            </div>
        </div>
    </div>
    );
};