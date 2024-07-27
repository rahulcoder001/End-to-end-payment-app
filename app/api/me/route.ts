import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/db";
import { getdata } from "../../../helper/getdata";
import { User } from "../../../models/usermodel";
connect();

export async function GET(req:NextRequest){
    try {
        const id = getdata(req);
        //@ts-ignore
        const user= await User.findOne({_id: id});
        if(!user){
            return NextResponse.json({status:false})
        }
        return NextResponse.json({
            status:true,
            name:user.name,
            email:user.email,
            number:user.number,
            Transaction: user.onRampTransactions
        })
        
    } catch (error) {
        return NextResponse.json({status:false});
    }
    
  
}
