import { AuthFactory } from "../auth/authFactory.js";
import { ApiError } from "../errors/ApiError.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const login = async (req, res, next) => {
    try {
        const { strategy, ...credentials } = req.body;
        const { token, user } = await loginUser(strategy, credentials);
        res.json({ success: true, token, user });
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 401));
    }
};

export const register = async (req, res, next) => {
    try {
        const { strategy, ...credentials } = req.body;
        const result = await registerUser(strategy, credentials);
        res.json(result);
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 401));
    }
};


export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const strategyInstance = AuthFactory("email");
        const result = await strategyInstance.verifyOtp({ email, otp });
        res.json(result);
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 401));
    }
};