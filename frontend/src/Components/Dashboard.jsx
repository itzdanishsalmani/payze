import { useEffect, useState } from "react";
import axios from "axios";

export function Dashboard() {
    const [allUsers, setAllUsers] = useState([]); // Initial state should be an array

    const balance = `$5000`;

    useEffect(() => {
        axios.get(`http://localhost:7000/api/v1/user/bulk`)
            .then(res => {
                // Ensure that the response contains the 'user' array
                    setAllUsers(res.data.user);
            })
            .catch(err => {
                console.error(err); // Handle the error
            });
    }, []);

    return (
        <div>
            <Title balance={balance} allUsers={allUsers} />
        </div>
    );
}

const Title = ({ balance, allUsers }) => {
    return (
        <div>
            <div className="p-4 flex justify-between items-center border">
                <div className="font-bold text-blue-800 text-xl">Easy Pay</div>
                <div>Hello, Current User <button>Logout</button></div>
            </div>
            <div className="p-4 font-bold">Your Balance {balance}</div>
            <div className="p-4 font-bold">Users</div>
            <div className="pt-2 ml-4 mr-4 border rounded">
                <input type="text" placeholder="search users..." />
            </div>
            <div className="p-4 flex flex-col text-lg">
                {allUsers.map((user, index) => (
                    <div className="flex justify-between" key={index}>
                        <div >{user.firstName}</div> 
                    <div className="p-2 bg-black text-white cursor-pointer border rounded" onClick={() => {  }}>send money</div> </div>
                ))}  

            </div>
        </div>
    );
}
