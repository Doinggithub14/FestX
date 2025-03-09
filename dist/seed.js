"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("./lib/mongodb");
const User_1 = __importDefault(require("./models/User"));
const Event_1 = __importDefault(require("./models/Event"));
const crypto_1 = __importDefault(require("crypto"));
// Helper function to hash a password using SHA-256
function hashPassword(password) {
    return crypto_1.default.createHash("sha256").update(password).digest("hex");
}
async function seed() {
    try {
        await (0, mongodb_1.connectToDatabase)();
        console.log("Connected to database.");
        // Clear existing data (use with caution in production)
        await User_1.default.deleteMany({});
        await Event_1.default.deleteMany({});
        console.log("Existing data cleared.");
        // Create 10 sample users
        const users = [
            {
                fullName: "Rohit Sharma",
                email: "rohit@fest.com",
                password: hashPassword("rohitpassword"),
                college: "IIT Delhi",
                year: "2024",
                degree: "B.Tech",
                branch: "CSE",
                enrollmentNumber: "ADM001",
                phoneNumber: 9876543210,
                role: "admin",
                registrations: [],
            },
            {
                fullName: "Priya Singh",
                email: "priya@fest.com",
                password: hashPassword("priyapassword"),
                college: "Delhi University",
                year: "2023",
                degree: "B.Sc",
                branch: "Mathematics",
                enrollmentNumber: "USR001",
                phoneNumber: 9123456780,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Amit Patel",
                email: "amit@fest.com",
                password: hashPassword("amitpassword"),
                college: "BITS Pilani",
                year: "2023",
                degree: "B.Tech",
                branch: "IT",
                enrollmentNumber: "USR002",
                phoneNumber: 9988776655,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Neha Kumar",
                email: "neha@fest.com",
                password: hashPassword("nehapassword"),
                college: "Anna University",
                year: "2023",
                degree: "B.E.",
                branch: "Electronics",
                enrollmentNumber: "USR003",
                phoneNumber: 9876501234,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Rajesh Verma",
                email: "rajesh@fest.com",
                password: hashPassword("rajeshpassword"),
                college: "IIT Bombay",
                year: "2024",
                degree: "B.Tech",
                branch: "Mechanical",
                enrollmentNumber: "USR004",
                phoneNumber: 9123001122,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Simran Kaur",
                email: "simran@fest.com",
                password: hashPassword("simranpassword"),
                college: "IIT Madras",
                year: "2024",
                degree: "B.Tech",
                branch: "EEE",
                enrollmentNumber: "USR005",
                phoneNumber: 9988007766,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Vikram Singh",
                email: "vikram@fest.com",
                password: hashPassword("vikrampassword"),
                college: "NIT Trichy",
                year: "2023",
                degree: "B.Tech",
                branch: "Civil",
                enrollmentNumber: "USR006",
                phoneNumber: 9876123450,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Ananya Roy",
                email: "ananya@fest.com",
                password: hashPassword("ananyapassword"),
                college: "Jadavpur University",
                year: "2023",
                degree: "B.Sc",
                branch: "Physics",
                enrollmentNumber: "USR007",
                phoneNumber: 9123987601,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Siddharth Menon",
                email: "siddharth@fest.com",
                password: hashPassword("siddharthpassword"),
                college: "IIT Kharagpur",
                year: "2024",
                degree: "B.Tech",
                branch: "Chemical",
                enrollmentNumber: "USR008",
                phoneNumber: 9988773344,
                role: "user",
                registrations: [],
            },
            {
                fullName: "Ayesha Khan",
                email: "ayesha@fest.com",
                password: hashPassword("ayeshapassword"),
                college: "Amity University",
                year: "2023",
                degree: "BBA",
                branch: "Management",
                enrollmentNumber: "USR009",
                phoneNumber: 9876543321,
                role: "user",
                registrations: [],
            },
        ];
        const createdUsers = await User_1.default.insertMany(users);
        console.log(`Created ${createdUsers.length} users.`);
        // Create 20 sample events
        const categories = [
            "Tech",
            "Cultural",
            "Sports",
            "Music",
            "Entrepreneurship",
            "Art",
        ];
        const clubs = [
            "Tech Club",
            "Cultural Club",
            "Sports Club",
            "Music Club",
            "Business Club",
            "Art Club",
        ];
        const now = new Date();
        const events = [];
        for (let i = 1; i <= 20; i++) {
            const category = categories[i % categories.length];
            const clubName = clubs[i % clubs.length];
            const startDate = new Date(now.getTime() + i * 86400000); // each event a day apart
            const endDate = new Date(startDate.getTime() + 5 * 3600000); // +5 hours
            events.push({
                eventName: `Event ${i}`,
                clubName,
                category,
                registrationFee: 50 + i * 5,
                image: `https://via.placeholder.com/600x400.png?text=Event+${i}`,
                description: `Description for Event ${i} in category ${category}.`,
                date: startDate,
                time: `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes()
                    .toString()
                    .padStart(2, "0")}`,
                endDate,
                venue: `Venue ${i}`,
                registrations: [],
            });
        }
        const createdEvents = await Event_1.default.insertMany(events);
        console.log(`Created ${createdEvents.length} events.`);
        // Simulate registrations for each event with 1 to 3 random users per event
        for (const event of createdEvents) {
            const numberOfRegs = Math.floor(Math.random() * 3) + 1; // 1 to 3 registrations
            for (let j = 0; j < numberOfRegs; j++) {
                const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
                const registrationEntry = {
                    user: randomUser._id,
                    registeredAt: new Date(),
                    teamName: "",
                    registrationDetails: {
                        fullName: randomUser.fullName,
                        email: randomUser.email,
                        phoneNumber: randomUser.phoneNumber.toString(),
                    },
                };
                // Add registration to event
                event.registrations.push(registrationEntry);
                // Also update the user document
                await User_1.default.findByIdAndUpdate(randomUser._id, {
                    $push: {
                        registrations: {
                            event: event._id,
                            teamName: "",
                            registrationDetails: {
                                fullName: randomUser.fullName,
                                email: randomUser.email,
                                phoneNumber: randomUser.phoneNumber.toString(),
                            },
                        },
                    },
                });
            }
            await event.save();
        }
        console.log("Seeding completed.");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}
seed();
