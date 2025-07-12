import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findById(userId);
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" });
        }

        // Get user data from Clerk
        const { clerkClient } = await import('@clerk/nextjs/server');
        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(userId);

        // Create user data
        const userData = {
            _id: userId,
            email: clerkUser.emailAddresses[0].emailAddress,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
            imageUrl: clerkUser.imageUrl,
            cartItems: {}
        };

        // Create user in database
        const newUser = await User.create(userData);

        return NextResponse.json({ success: true, user: newUser });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, message: error.message });
    }
} 