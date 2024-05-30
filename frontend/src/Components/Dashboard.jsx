import { useEffect, useState } from "react"
import axios from "axios"

export function Dashboard(){
    const [allUsers, setAllUsers] = useState({}); 

        const balance = `$5000`
        useEffect(()=>{
            // Axios call is not awaited, and there's an incorrect way of handling the response
            // Corrected below
            axios.get(`http://localhost:7000/api/v1/user/bulk`)
                .then(res => {
                    // Correctly set the state with the response data
                    setAllUsers(res.data)
                })

        }, [])
    return (
        <div>
            <Title  balance={balance} allUsers={allUsers} setAllUsers={setAllUsers} />
       </div>
   
)
    
}

const Title = ({balance,allUsers}) =>{
    return (
        <div>
            <div className="p-4 flex justify-between items-center border">
                <div className="font-bold text-blue-800 text-xl" >Easy Pay</div>
                <div >Hello, Current User <button>Logout</button> </div> 
            </div>
            <div className="p-4 font-bold">Your Balance {balance} </div>
            <div className="p-4 font-bold">Users </div>
            <div className="pt-2 ml-4 mr-4 border rounded"><input type="text" placeholder="search users..."/></div>
            <div className="p-4 flex justify-between text-lg"> 
              {allUsers.map((user, index) => ( 
              <div className="p-4" key={index}>{user.firstName}</div>
          ))}
            
</div>
        </div>
    )
}
