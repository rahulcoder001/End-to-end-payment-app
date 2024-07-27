"use client"

import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getdata() {
      const response = await axios.get('/api/me');
      setUser(response.data.status);
    }
    getdata();
  }, []);

  if (!user) {
    return (
      <div className="bg-red-50 h-screen flex justify-center items-center">
        <div className="w-1/2 p-10">
          <div className="flex">
            <div className="flex font-extrabold text-3xl ml-2 text-purple-600 font-serif">
              <p className="text-4xl">RM</p>
              <p className="mt-1">Pay</p>
            </div>
            <div className="rounded-full p-2 ml-1 bg-green-300 text-white">
              <p className="ml-1 text-sm font-semibold">BE SAFE</p>
              <p className="ml-1 text-sm font-semibold">PAY SAFE</p>
            </div>
          </div>
          <div className="p-2 mt-8">
            <p className="font-bold text-2xl">Pay any through your wallet or directly from your bank account</p>
            <p className="font-semibold mt-4">
              Pay anyone, everywhere. Make contactless & secure payments in-stores or online using Paytm UPI or Directly from your Bank Account. Plus, send & receive money from anyone.
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={()=>{router.push("/login")}} className="p-2 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-400">
              Login to explore
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="https://assetscdn1.paytm.com/images/catalog/view_item/728702/1626342071104.png"  className='h-50' alt="" />
        </div>
      </div>
    );
  }

  router.push('/Home');
}
