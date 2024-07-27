"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Homecard } from "@/component/Homecard";

interface Balance {
  amount: number;
  locked: number;
}

export default function HomePage() {
 
  const [condition, setCondition] = useState(false);
  const [balance, setBalance] = useState<Balance>({ amount: 0, locked: 0 });
  const [user, setUser] = useState<any[]>([]);
  const router = useRouter();


  

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/api/me');
      setUser(response.data);
    }

    async function getBalance() {
      const response = await axios.get('/api/money');
      setBalance({ amount: response.data.amount, locked: response.data.locked });
    }
      getData();
      getBalance();
  }, []);

  function button1(){
     router.push("/Transfer")
  }
  function button2(){
    router.push("/ptop")
 }

  //@ts-ignore
  const name = user?.name || "Anonymous";
  //@ts-ignore
  const email = user?.email || "no registered email";
  //@ts-ignore
  const number = user?.number || "00000000000";

  return (
    <div className="bg-red-50">
      <div className="flex text-purple-600">
        <h1 className="font-extrabold text-3xl">Welcome!</h1>
        <p className="font-bold ml-10 text-2xl mt-1">Mr/Mrs {name}</p>
      </div>
      <div className="mt-10 flex">
        <button
          className={`p-2 px-3 text-sm font-semibold rounded-3xl ${!condition ? `shadow-md bg-white text-black` : `text-slate-600`}`}
          onClick={() => setCondition(false)}
        >
          Balance
        </button>
        <button
          className={`p-2 px-3 text-sm font-semibold rounded-3xl ml-5 ${condition ? `shadow-md bg-white text-black` : `text-slate-600`}`}
          onClick={() => setCondition(true)}
        >
          Personal Info
        </button>
      </div>
      <div className="mt-10 bg-white shadow-md w-3/4 h-96 rounded-lg">
        <Homecard condition={condition} balance={balance.amount} email={email} number={number} name={name} button1={button1} button2={button2} />
      </div>
    </div>
  );
}
