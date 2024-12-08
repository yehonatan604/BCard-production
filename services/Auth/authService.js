import jwt from "jsonwebtoken";
import { envService } from "../Env/envService.js";

const { SECRET_KEY, MAIL_VERIFY_KEY } = envService;

const generateAuthToken = (user) => {
    const { _id, isAdmin, firstName, permission, companyId } = user;
    const payloadData = { _id, isAdmin, firstName, permission, companyId };
    const token = jwt.sign(payloadData, SECRET_KEY, { expiresIn: "7d" });
    return token;
};

const generateRegisterToken = (_id) => {
    return jwt.sign({ _id }, MAIL_VERIFY_KEY, { expiresIn: "20m" });
};

const verifyRegisterToken = (tokenFromClient) => {
    try {
        return jwt.verify(tokenFromClient, MAIL_VERIFY_KEY);
    } catch (error) {
        return null;
    }
};

const verifyToken = (tokenFromClient) => {
    try {
        const userData = jwt.verify(tokenFromClient, SECRET_KEY);
        return userData;
    } catch (error) {
        return null;
    }
};

export { generateAuthToken, verifyToken, generateRegisterToken, verifyRegisterToken };
