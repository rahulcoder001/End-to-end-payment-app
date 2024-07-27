"use client";


import { Balancecard } from "@/component/Balancecard";
import { Recentcard } from "@/component/Recentcard";
import { Transfercard } from "@/component/Transfercard";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Balance {
    amount: number;
    locked: number;
}

export default function ParentComponent() {
    const [balance, setBalance] = useState<Balance>({ amount: 0, locked: 0 });
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function getBalance() {
            const response = await axios.get('/api/money');
            setBalance({ amount: response.data.amount, locked: response.data.locked });
        }
        async function getOnRampTransactions() {
            const response = await axios.get('/api/recent');
            const formattedTransactions = response.data.map((t: any) => ({
                ...t,
                time: new Date(t.time)
            }));
            setTransactions(formattedTransactions);
        }

        getBalance();
        getOnRampTransactions();
    }, []); // Add an empty dependency array to run only once

    async function onsubmit({ amount, provider }: { amount: number; provider: string }) {
        const responce1 = await axios.post("/api/add", {
            provider: provider,
            amount: amount
        });
        if(responce1.data.ok){
            toast.success(responce1.data.msg);
        }
        else{
            toast.error(responce1.data.msg);
            return;  
        }

        const responce2 =  await axios.put("api/add",{amount});
        if(responce1.data.ok){
            toast.success(responce2.data.msg);
        }
        else{
            toast.error(responce2.data.msg);
            return; 
        }
    }

    return (
        <div className="h-96">
            <div className="text-4xl font-bold text-purple-600">Transfer</div>
            <div className="flex h-full">
                <div className="w-1/2">
                    <Transfercard onsubmit={onsubmit} />
                </div>
                <div className="w-1/2">
                    <div>
                        <Balancecard amount={balance.amount} locked={balance.locked} />
                    </div>
                    <div>
                        <Recentcard transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
