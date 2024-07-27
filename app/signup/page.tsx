"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormComplete = form.name !== '' && form.email !== '' && form.mobile !== '' && form.password !== '' && form.confirmPassword !== '';
    setIsFormValid(isFormComplete);
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        name: form.name,
        email: form.email,
        number: form.mobile,  
        password: form.password
      });
 
      if(response.data.ok){
        toast.success(response.data.msg);
        router.push("/Home");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else{
        toast.error(response.data.msg);
        router.push("/");
      }
    } catch (error) {
      toast.error("something went worng");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-red-50">
      <div className="p-2 rounded-xl w-1/2 lg:w-1/4 flex flex-col justify-center bg-white shadow-md">
        <h1 className="text-center font-bold text-2xl text-purple-600">RMPay</h1>
        <p className="text-center font-semibold text-xl text-slate-500 mt-10">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter Your name!"
              type="text"
              onChange={(e)=> setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter your email!"
              type="email"
              onChange={(e)=> setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter Your mobile number!"
              type="number"
              onChange={(e)=> setForm({ ...form, mobile: e.target.value })}
              required
            />
          </div>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter your Password!"
              type="password"
              onChange={(e)=> setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="border-2 border-slate-600 m-2 mt-4 rounded-lg p-1">
            <input
              className="p-1 outline-none w-full"
              placeholder="Enter same password again!"
              type="password"
              onChange={(e)=> setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>
          <p className='text-sm font-semibold text-slate-400'>Already have an account? <Link className='underline text-purple-600' href={"/login"}>Login</Link></p>
          <div className="flex flex-col justify-center items-center m-2 mb-4">
            {!isFormValid && (
              <p className="text-red-500 mb-2">Complete all input fields</p>
            )}
            <button
              className={`p-2 font-bold rounded-lg px-4 ${isFormValid ? 'text-white bg-purple-600 hover:bg-purple-500' : 'text-gray-400 bg-gray-200 cursor-not-allowed'}`}
              type="submit"
              disabled={!isFormValid}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
