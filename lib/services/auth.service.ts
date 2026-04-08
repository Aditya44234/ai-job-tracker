import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";



const JWT_SECRET = process.env.JWT_SECRET!;


export async function registerUser(name: string, email: string, password: string) {

    const existing = await User.findOne({ email });

    if (existing) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
}


export async function loginUser(email: string, password: string) {

    const user = await User.findOne({ email })



    if (!user) throw new Error("Invalid credentials....");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials.O");

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { user, token };

}


