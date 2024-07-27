import { NextRequest, NextResponse } from "next/server";
import { getdata } from "../../../helper/getdata";
import { Transaction } from "../../../models/usermodel";
import { connect } from "../../../dbConfig/db";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const id = getdata(req);

        if (!id) {
            throw new Error("User ID not found in request");
        }

        //@ts-ignore
        const transactions = await Transaction.find({ user: id });

        const formattedTransactions = transactions.map((t: any) => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }));

        return NextResponse.json(formattedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Error fetching transactions' }, { status: 500 });
    }
}
