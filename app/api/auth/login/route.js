import { NextResponse } from "next/server";
import { findUser } from "@/lib/actions/findUser";
import { compare } from "bcrypt"
import { set_JWT_Token } from "@/lib/actions/jwt_token";
import { cookies } from "next/headers";

export async function POST(req) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Name, email, and password are required' },
            { status: 400 } // Bad Request
        );
    }

    const loginUser = await findUser({ email })
    if (!loginUser) {
        return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 409 } // Conflict
        );
    }

    if (await compare(password, loginUser.password)) {
        const userData = JSON.parse(JSON.stringify(loginUser))
        let token = await set_JWT_Token({_id: userData._id, name: userData.name, email: userData.email, role: userData.role})
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
            { message: "Loggin In" },
            { status: 201 }
        );
    }
    else {
        return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 409 }
        );
    }
}