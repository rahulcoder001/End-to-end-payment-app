"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  function validation() {
    if (form.email !== '' && form.password !== '') {
      setIsFormValid(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await axios.post("/api/signin", {
        email: form.email,
        password: form.password,
      });
      if (response.data.ok) {
        toast.success(response.data.msg);
        router.push("/Home");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(response.data.msg);
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      router.push("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-red-50">
      <div className="p-2 rounded-xl w-1/2 lg:w-1/4 flex flex-col justify-center bg-white shadow-md">
        <h1 className="text-center font-bold text-2xl text-purple-600">RMPay</h1>
        <p className="text-center font-semibold text-xl text-slate-500 mt-10">Login</p>
        <form onSubmit={handleSubmit}>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter your email!"
              type="email"
              onChange={(e) => { setForm({ ...form, email: e.target.value }); validation(); }}
              required
            />
          </div>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter your Password!"
              type="password"
              onChange={(e) => { setForm({ ...form, password: e.target.value }); validation(); }}
              required
            />
          </div>
          <p className="text-sm font-semibold text-slate-400">Don&apos;t have an account? <Link className="underline text-purple-600" href={"/signup"}>Sign up</Link></p>
          <div className="flex flex-col justify-center items-center m-2 mb-4">
            {!isFormValid && (
              <p className="text-red-500 mb-2">Complete all input fields</p>
            )}
            <button
              className={`p-2 font-bold rounded-lg px-4 ${isFormValid ? 'text-white bg-purple-600 hover:bg-purple-500' : 'text-gray-400 bg-gray-200 cursor-not-allowed'}`}
              type="submit"
              disabled={!isFormValid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
