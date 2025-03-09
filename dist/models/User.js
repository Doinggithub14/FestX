"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ParticipationHistorySchema = new mongoose_1.Schema({
    eventName: { type: String, required: true },
    participatedAt: { type: Date, default: Date.now },
});
const UserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    enrollmentNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    participationHistory: {
        type: [ParticipationHistorySchema],
        default: [],
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    registrations: {
        type: [
            {
                event: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event" },
                registeredAt: { type: Date, default: Date.now },
                teamName: { type: String, default: "" },
                registrationDetails: {
                    fullName: { type: String },
                    email: { type: String },
                    phoneNumber: { type: String },
                },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
exports.default = User;
