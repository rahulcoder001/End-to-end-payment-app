"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PtopPage = () => {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  async function sendPtp() {
    setLoader(true);
    try {
      const response = await axios.post("api/ptop", { amount, number });
      setLoader(false);
      if (response.data.ok) {
        toast.success(response.data.msg);
        router.push("/Home");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Error in sending payment");
      console.error(error);
    }
  }

  if (loader) {
    return (
      <div className="flex p-2 h-96">
        <div className="shadow-md bg-white w-1/2 rounded-md flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex p-2 h-96">
      <div className="shadow-md bg-white w-1/2 rounded-md flex flex-col justify-center">
        <p className="font-bold text-xl text-purple-600 text-center">Transfer To Friend</p>
        <div className="p-2 mt-4 px-10">
          <label htmlFor="amount" className="text-sm font-semibold">Amount</label>
          <input
            type="number"
            id="amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            name="amount"
            placeholder="Enter your amount!"
            className="border-2 border-slate-600 p-1 w-full outline-none rounded-lg"
          />
        </div>
        <div className="p-2 mt-4 px-10">
          <label htmlFor="number" className="text-sm font-semibold">Phone Number</label>
          <input
            type="number"
            id="number"
            name="number"
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your Friend's Number!"
            className="border-2 border-slate-600 p-1 w-full outline-none rounded-lg"
          />
        </div>
        <div className="flex justify-center m-2">
          <button onClick={sendPtp} className="p-2 rounded-lg px-4 bg-purple-600 font-bold text-white">Send</button>
        </div>
      </div>
    </div>
  );
};

PtopPage.displayName = "PtopPage";

export default PtopPage;
