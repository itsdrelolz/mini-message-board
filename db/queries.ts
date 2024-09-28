import { Pool } from "pg";

// Create a new pool instance
const pool = new Pool({
    host: 'dpg-crrnfpl6l47c73clmt80-a.ohio-postgres.render.com',
    user: 'messageapp_0w4y_user',
    password: 'ZshV14ngbmJZc0675BKcKvdg1nH99mtr',
    database: 'messageapp_0w4y',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // This is for development; set to true in production for security
    }
});

// Define the Message interface
interface Message {
    id: number;
    message: string;
    username: string;
}

// Get all messages
export async function getAllMessages(): Promise<Message[]> {
    try {
        const { rows } = await pool.query<Message>("SELECT * FROM messages");
        return rows;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error; // Re-throw the error after logging it
    }
}

// Insert a message
export async function insertMessage(message: string, username: string): Promise<void> {
    try {
        await pool.query("INSERT INTO messages (message, username) VALUES ($1, $2)", [message, username]);
    } catch (error) {
        console.error("Error inserting message:", error);
        throw error; // Re-throw the error after logging it
    }
}

// Select a user message by ID
export async function selectUserMessage(id: number): Promise<Message | null> {
    try {
        const { rows } = await pool.query<Message>("SELECT * FROM messages WHERE id = $1", [id]);
        return rows.length > 0 ? rows[0] : null; // Return null if no message is found
    } catch (error) {
        console.error("Error fetching user message:", error);
        throw error; // Re-throw the error after logging it
    }
}
