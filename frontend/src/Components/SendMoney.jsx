export function SendMoney(){
    return (
        <div>
            <SendMoneyCard />   
        </div>
    )
}

const SendMoneyCard = () => {
    return (
        <div>
            <div className="bg-slate-300 flex flex-col h-screen justify-center items-center"> 
                <div className="bg-white p-4 w-80 rounded-lg ">
                    <div className="text-center font-bold text-3xl">Send Money</div>
                    <div className="mt-12 text-lg">Username</div>
                    <div className="mt-4">Amount(in $)</div>
                    <div><input className="mt-2 mb-2 w-100" type="number" placeholder="Enter Amount"/></div>
                    <div className="mt-4 p-2 cursor-pointer text-white bg-green-500 text-center border rounded-lg">Initiate Transfer</div>
                </div>
            </div>
        </div>
    )
}