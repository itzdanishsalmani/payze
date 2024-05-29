import { useNavigate } from "react-router-dom";

export function SignUp() {

    const headingText = "Sign Up";
    const description = "Enter your information to create an account"

    return (
        <div>
            <SignupCard heading={headingText} desc={description} />
        </div>
    )
    
}

const SignupCard = ({ heading,desc })=>{
    const navigate = useNavigate();

    return ( <div>
     <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-4 w-80 rounded-lg border-black">
        <div className="text-3xl font-bold text-center p-4">{heading}</div>
        <div className="text-center" >{desc}</div>
        <div className="p-4 rounded-lg font-bold" >
            <div >First Name</div>
            <div className="mt-2 mb-2" > <input type="text" placeholder="John"/> </div>

            <div>Last Name</div>
            <div className="mt-2 mb-2" > <input type="text" placeholder="Doe"/> </div>   

            <div>Email</div>
            <div className="mt-2 mb-2" > <input type="text" placeholder="johndoe@example.com"/> </div>
            <div>Password</div>
            <div className="mt-2 mb-2" > <input type="text" placeholder="password"/> </div>
        </div>
        <div className="rounded-lg bg-black text-white font-bold text-center cursor-pointer p-2">Sign Up</div>
        <div className="m-2"> Already have an account? <span className="underline m-2 cursor-pointer" onClick={()=>{
            navigate("/signin")
        }}>Login</span></div>
    </div>
    </div>
    </div>
)}