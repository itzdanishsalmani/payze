import axios from "./axiosConfig"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function SendMoney(){

    return (
        <div>
            
            <SendMoneyCard />   
        </div>
    )
}

const SendMoneyCard = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please Sign up")
            navigate("/signup")
            return
        }
    },[])

    return (
        <div>
            <div className="bg-slate-300 flex flex-col h-screen justify-center items-center"> 
                <div className="bg-white p-4 w-80 rounded-lg ">
                    <div className="text-center font-bold text-3xl">Send Money</div>
                    <div className="mt-12 text-lg">{name}</div>
                    <div className="mt-4">Amount(in $)</div>
                    <div><input className="mt-2 mb-2 w-100" type="number" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)} /></div>
                    <div className="mt-4 p-2 cursor-pointer text-white bg-green-500 text-center border rounded-lg" onClick={() => {
                        const userId = localStorage.getItem("userId")
                        if (amount===0){
                            toast.error("Amount should not be empty")
                            return
                        }
                        axios.post("/account/transfer", {
                            userId:userId,
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response=>{
                            if(response){
                                toast.success("Transaction complete")
                                navigate("/dashboard")
                            }
                        })
                        .catch(error=>{
                            if(error.response){
                                toast.error(error.response.data.message)
                            }else{
                                toast.error("There is an error while transaction",error)
                            }
                        })
                    }}
                     >Initiate Transfer</div>
                </div>
            </div>
        </div>
    )
}