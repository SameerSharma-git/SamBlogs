import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { addUser } from "@/lib/actions/signupAction";
import { findUser } from "@/lib/actions/findUser";
import { cookies } from "next/headers";
import { set_JWT_Token } from "@/lib/actions/jwt_token";

export async function POST(req, res) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 } // Bad Request
            );
        }

        const existingUser = await findUser({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 } // Conflict
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let currentDate = Date.now()

        if (email==="sameersharm1234@gmail.com") {
            var newUser = await addUser({ name, email, password: hashedPassword, role:"admin", createdAt: currentDate, updatedAt: currentDate })
        }
        else {
            var newUser = await addUser({ name, email, password: hashedPassword, createdAt: currentDate, updatedAt: currentDate })
        }
        const userData = JSON.parse(JSON.stringify(newUser))
        
        let token = await set_JWT_Token({_id: userData._id, name: userData.name, email: userData.email, role: userData.role })
        console.log(token)

        let cookieStore = await cookies()
        cookieStore.set('jwt_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use this for prod/dev
            maxAge: 60 * 60, // 1 hour
            path: '/',
            sameSite: 'Lax',
        });

        return NextResponse.json(
            { message: 'User created successfully', user: newUser },
            { status: 201 } // Created
        );
    } catch (error) {
        console.error('Signup API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}