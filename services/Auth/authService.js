import jwt from "jsonwebtoken";
import { envService } from "../Env/envService.js";
import { hashPassword } from "../../users/helpers/password.js";

const { SECRET_KEY, MAIL_VERIFY_KEY } = envService;

const generateAuthToken = async (user) => {
    const { _id, op } = user;
    const payloadData = { _id, op: await hashPassword(op) };
    const token = jwt.sign(payloadData, SECRET_KEY, { expiresIn: "7d" });
    return token;
};

const generateRegisterToken = (_id) => {
    return jwt.sign({ _id }, MAIL_VERIFY_KEY, { expiresIn: "20m" });
};

const verifyToken = (tokenFromClient, isRegisterToke) => {
    try {
        return jwt.verify(tokenFromClient, isRegisterToke ? MAIL_VERIFY_KEY : SECRET_KEY);
    } catch (error) {
        return null;
    }
};

export { generateAuthToken, verifyToken, generateRegisterToken };
