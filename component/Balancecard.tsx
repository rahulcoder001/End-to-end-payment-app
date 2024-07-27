import "../app/globals.css"

export const Balancecard = ({amount,locked}:{amount:number;locked:number})=>{
    return <div className="m-2 bg-white p-1 shadow-md">
        <p className="border-b-2 font-semibold text-slate-400">Balance</p>
        <div className="flex justify-between p-1 m-2">
            <p className="font-semibold">Unloacked balance</p>
            <p className="text-green-500 font-bold">+${amount}</p>
        </div>
        <div  className="flex justify-between p-1 m-2">
            <p className="font-semibold">Total loacked balance</p>
            <p className="font-bold text-red-600">${locked}</p>
        </div>
        <div className="flex justify-between p-1 m-2">
            <p className="font-semibold">Total Balance</p>
            <p className="font-bold text-green-500">+${(amount+locked)}</p>
        </div>
    </div>   
}