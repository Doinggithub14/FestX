"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}
const MONGODB_URI = process.env.DATABASE_URL;
const cache = global.mongooseCache || { conn: null, promise: null };
if (process.env.NODE_ENV === "development") {
    if (!global.mongooseCache) {
        global.mongooseCache = cache;
    }
}
async function connectToDatabase() {
    if (cache.conn) {
        return cache.conn;
    }
    if (!cache.promise) {
        cache.promise = mongoose_1.default.connect(MONGODB_URI);
    }
    cache.conn = await cache.promise;
    return cache.conn;
}
