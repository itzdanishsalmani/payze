import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios/axiosConfig";
import { toast } from "react-toastify";

export function Dashboard() {
    const [allUsers, setAllUsers] = useState([]);
    const [balance, setBalance] = useState("");
    const [filter,setFilter] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please sign up");
            navigate("/signup");
            return;
        }

        axios.get("/user/bulk?filter="+filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            setAllUsers(res.data.users);
        })
        
        const userId = localStorage.getItem("userId")
        // Fetch balance
        axios.get(`/account/balance/${userId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            setBalance(res.data.balance);
        })
        
    }, [balance,filter]);

    return (
        <div>
            <Title balance={balance} allUsers={allUsers} setFilter={setFilter} />
        </div>
    );
}

const Title = ({ balance, allUsers, setFilter }) => {
    const navigate = useNavigate()

    return (
        <div >
            <div className=" p-4 flex justify-between items-center border">
                <div className="font-bold text-green-500 text-2xl"> <a href="https://twitter.com/itzzdanish">Payze</a></div>
                <div><button className="mx-2 p-2 rounded-full bg-green-500 text-white border" onClick={()=>{
                    navigate("/edit")
                }} >Edit Profile</button>
                 
                     <button className="mx-2 p-2 rounded-full bg-green-500 text-white border" onClick={()=>{
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    navigate("/signin")
                }} >Logout </button>
                </div>
            </div>
            <div className="p-4 font-bold flex justify-between">
                <div>Your Balance</div>
                <div>${balance}</div>
            </div>
            <div className="p-4 font-bold">Users</div>
            <div className="border rounded">
                <input className="w-screen m-2 " type="text" placeholder="search users..." onChange={(e)=>setFilter(e.target.value)} />
            </div>
            <div className="p-4 flex flex-col text-lg">
                {allUsers.length===0 ? (
                    <div className="font-bold text-center">Loading...</div>
                ):(
                allUsers.map((user, index) => ( 
                    <div className="flex justify-between" key={index}>
                        <div >{user.firstName} {user.lastName} </div>
                        <div className="pl-2 pr-2 md:pl-4 md:px-4 md:py-2 bg-green-500 md:text-xl text-white cursor-pointer border rounded-full" onClick={(e) => 
                            navigate("/send?id=" + user._id + "&name=" + user.firstName)
                        } > send </div> 
                        </div>
                ))
                )}
                
            </div>
        </div>
    );
}