import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/db";
import { getdata } from "../../../helper/getdata";
import { Balance } from "../../../models/usermodel";
connect();

export async function GET(req:NextRequest){
   
    try {
        const id = getdata(req);
        //@ts-ignore
        const balance = await Balance.findOne({user:id});
        return NextResponse.json({amount:balance.amount,locked:balance.locked});
    } catch (error) {
        return NextResponse.json({error});
    }
}
