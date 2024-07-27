import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "../dbConfig/db";
connect();

export const getdata = (req:NextRequest)=>{
    try {
        const token = req.cookies.get('token')?.value||"";
        const data :any = jwt.verify(token, process.env.JWT_KEY!);
        const id = data.userid
        return id;
       
    } catch (error) {
        throw new Error("error");
    }
}