import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/db";
import { Balance, Transaction, User } from "../../../models/usermodel";
import { getdata } from "../../../helper/getdata";
connect();

export async function POST(req:NextRequest){

    const body = await req.json();
    const senderid = getdata(req);
    if(!senderid){
        return NextResponse.json({ok:false, msg:"You should login first"});
    }
    //@ts-ignore
    const sender = await User.findOne({_id:senderid})
    //@ts-ignore
    const reciver = await User.findOne({number:body.number});
    if(!reciver){
        return NextResponse.json({ok:false, msg:"reciver not found"});
    }
    //@ts-ignore
    const session = await Balance.startSession();
    session.startTransaction();

    try {
        //@ts-ignore
        const senderBalance = await Balance.findOne({ user: sender._id }).session(session);
        if (!senderBalance || senderBalance.amount < body.amount) {
            return NextResponse.json({ ok: false, msg: "Insufficient balance" });
        }

        // Simulate delay
        await new Promise(r => setTimeout(r, 4000));

        // Deduct amount from sender
        await Balance.updateOne(
            { user: senderid },
            { $inc: { amount: -body.amount } }
        ).session(session);

        // Add amount to receiver
        await Balance.updateOne(
            { user: reciver._id },
            { $inc: { amount: body.amount } }
        ).session(session);

        // Save transactions
        const transaction1 = new Transaction({
            status: "recive",
            token: "no_need",
            provider: `ptop ${sender.name.split(" ")[0]} RMPay`,
            amount: body.amount,
            startTime: new Date(),
            user: reciver._id
        });
        await transaction1.save({ session });

        const transaction2 = new Transaction({
            status: "success",
            token: "no_need",
            provider: `ptop ${reciver.name.split(" ")[0]} RMPay`,
            amount: body.amount,
            startTime: new Date(),
            user: sender._id
        });
        await transaction2.save({ session });

        await session.commitTransaction();
        session.endSession();

        return NextResponse.json({ ok: true, msg: "money send succcefully" }, { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ ok: false, msg: "Something went wrong", error }, { status: 500 });
    }
}