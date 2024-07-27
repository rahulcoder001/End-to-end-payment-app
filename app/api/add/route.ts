import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/db";
import { getdata } from "../../../helper/getdata";
import { Balance, Transaction } from "../../../models/usermodel";

connect();

export async function POST(req: NextRequest) {
    const id = getdata(req);

    if (!id) {
        return NextResponse.json({ msg: "You should login first" , ok:false}, { status: 401 });
    }

    try {
        const token = Math.random().toString();
        const body = await req.json();
        const recent = new Transaction({
            status: "processing",
            token: token,
            provider: body.provider,
            amount: body.amount,
            startTime: new Date(),
            user: id
        });
        await recent.save();
        return NextResponse.json({ msg: "Started transaction" , ok:true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({mag:"something went worng",ok:false}, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const id = getdata(req);  
    const { amount } = await req.json(); 

    if (!id) {
        return NextResponse.json({ msg: "You should login first", ok: false }, { status: 401 });
    }

    try {
        await Balance.updateOne(
            { user: id },
            { $inc: { locked: amount } } 
        );

        return NextResponse.json({ msg: "Locked balance update", ok: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong", ok: false }, { status: 500 });
    }
}
