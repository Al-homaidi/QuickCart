import connectDB from "@/config/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {

    try {
        const { userId } = await auth();

        await connectDB();

        let user = await User.findById(userId);

        if (!user) {
            // User doesn't exist, create them automatically
            try {
                const { clerkClient } = await import('@clerk/nextjs/server');
                const clerk = await clerkClient();
                const clerkUser = await clerk.users.getUser(userId);

                const userData = {
                    _id: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                    imageUrl: clerkUser.imageUrl,
                    cartItems: {}
                };

                user = await User.create(userData);
            } catch (createError) {
                console.error('Error creating user:', createError);
                return NextResponse.json({ success: false, message: "Failed to create user" });
            }
        }

        return NextResponse.json({ success: true, user })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}