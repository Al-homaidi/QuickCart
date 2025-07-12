import { Inngest } from "inngest";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import User from "@/models/User";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
    },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        };

        await connectDB();
        await User.create(userData);
    }
);

// Inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk',
    },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        };

        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
);

export const createUserOrder = inngest.createFunction(
    {
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        }
    },
    { event: 'order/created' },
    async ({ events }) => {
        try {
            console.log("🔥 Inngest function triggered");

            const orders = events.map((event) => {
                console.log("📦 Event Data:", event.data);
                return {
                    userId: event.data.userId,
                    items: event.data.items,
                    amount: event.data.amount,
                    address: event.data.address,
                    date: event.data.date
                };
            });

            await connectDB();
            console.log("✅ DB Connected");

            await Order.insertMany(orders);
            console.log("✅ Orders inserted:", orders.length);

            return { success: true, processed: orders.length };

        } catch (error) {
            console.error("❌ Error in Inngest function:", error);
            return { success: false, message: error.message };
        }
    }
);