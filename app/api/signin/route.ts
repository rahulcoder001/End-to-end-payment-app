import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../dbConfig/db';
import { User } from '../../../models/usermodel';
import jwt from 'jsonwebtoken';
import z from "zod";
import bcrypt from "bcryptjs";

const signinscema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    //@ts-ignore
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json({ msg: 'User does not exist', ok: false });
    }

    const { success, error } = signinscema.safeParse(body);
    if (!success) {
      return NextResponse.json({ msg: "Incorrect input", error, ok: false });
    }

    const done = await bcrypt.compare(body.password, user.password);
    
    if (!done) {
      return NextResponse.json({ msg: 'Incorrect password', ok: false });
    }

    // Generate JWT token
    const token = jwt.sign({ userid: user._id }, process.env.JWT_KEY!);

    // Set token in cookies
    const res = NextResponse.json({ msg: 'User login', user, ok: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, 
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ msg: 'Error logging in user', error, ok: false });
  }
}
