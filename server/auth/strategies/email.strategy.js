import jwt from "jsonwebtoken";
import {
    createUser,
    validateUserCredentials,
    verifyUserOtp,
} from "../../services/user.service.js";
import { getDB } from "../../config/db.js";
import { ApiError } from "../../errors/ApiError.js";

export default class EmailAuthStrategy {
    async login({ email, password }) {
        const db = getDB();
        let user;
        try {
            user = await validateUserCredentials(email, password);
        } catch (err) {
            throw new ApiError("Something went wrong.", 401);
        }
        if (!user) throw new ApiError("Invalid credentials.", 401);

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { id: user._id.toString() },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        await db
            .collection("users")
            .updateOne({ _id: user._id }, { $set: { refreshToken } });

        return {
            success: true,
            token,
            refreshToken,
            user: {
                id: user._id.toString(),
                email: user.email,
                role: user.role,
            },
        };
    }

    async register({ email, password, role = "user" }) {
        const user = await createUser({ email, password, role });

        return {
            success: true,
            message:
                "OTP sent to your email. Please verify to activate your account.",
            user: {
                id: user.id.toString(),
                email: user.email,
                role: user.role,
            },
        };
    }

    async verifyOtp({ email, otp }) {
        await verifyUserOtp(email, otp);
        return { success: true, message: "Email verified successfully. You can now log in." };
    }
}