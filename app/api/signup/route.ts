import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../dbConfig/db';
import { Balance, User } from '../../../models/usermodel';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import z from "zod";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  number: z.string().min(10).max(15),
  password: z.string().min(5),
});

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the input
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return NextResponse.json({ msg: "Incorrect input", ok: false });
    }

    // Check if the user already exists
    //@ts-ignore
    const user = await User.findOne({ email: body.email });
    //@ts-ignore
    const user1 = await User.findOne({ number: body.number });

    if (user || user1) {
      return NextResponse.json({ msg: 'User already exists',ok:false });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    // Create and save a new user
    const newUser = new User(body);
    await newUser.save();

    const newBalance = new Balance({
      user: newUser._id,
      amount: 1000,
      locked: 0,
    });
    await newBalance.save();

    const token = await jwt.sign({ userid: newUser._id }, process.env.JWT_KEY!);

    const res = NextResponse.json({ msg: 'User created', newUser,ok:true });
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
    });

    return res;

  } catch (error) {
    return NextResponse.json({ msg: 'Error creating user',ok:false });
  }
}
