import lodash from "lodash";
import { generateRegisterToken, verifyToken } from "../../services/Auth/authService.js";
import { handleError } from "../../helpers/handleError.js";
import { sendMail } from "../../services/Mail/mailService.js";
import { registerMail } from "../../services/Mail/mails/register.mail.js";
import Group from "../models/Group.js";
import Op from "../models/Op.js";
import { statusCodes } from "../../helpers/statusCodes.js";

const { BAD_REQUEST, NOT_FOUND } = statusCodes;
const { pick } = lodash;

const register = async (data) => {
    try {
        const { _id, email, name, classCode } = data;

        let op = await Op.findOne({ email });
        if (op) throw new Error("Admin already registered");

        const classCodeExists = await Group.findOne({ classCode });
        if (!classCodeExists) throw new Error("Invalid class code");

        const emailVerifyToken = generateRegisterToken(_id);
        const mailContent = registerMail(op.email, `${name.first} ${name.last}`, emailVerifyToken);
        const mail = await sendMail(mailContent);
        if (!mail) throw new Error("Could not send email verification mail");

        op = new Op(data);
        op = await op.save();

        return Promise.resolve(pick(op, ["name", "email"]));
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const verify = async (token) => {
    try {
        const { _id } = verifyToken(token);
        if (!_id) throw new Error("Invalid token");

        let op = await Op.findById(_id);
        if (!op) throw new Error("Could not find this Admin in the database");

        op.isVerified = true;
        op = await op.save();

        return Promise.resolve(op);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const getAll = async () => {
    try {
        const ops = await Op.find();
        return Promise.resolve(ops);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const getOne = async (userId) => {
    try {
        let op = await Op.findById(userId);
        if (!op) throw new Error("Could not find this Admin in the database");
        return Promise.resolve(op);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const updateOne = async (userId, normalizedUser) => {
    try {
        const op = await Op.findByIdAndUpdate(userId, normalizedUser, {
            new: true,
        });
        if (!op) throw new Error("Could not find this Admin in the database");
        return Promise.resolve(op);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};


const deleteOne = async (userId) => {
    try {
        const op = await Op.findByIdAndDelete(userId);
        if (!op) throw new Error("Could not find this Admin in the database");

        op = pick(op, ["name", "email"]);

        return Promise.resolve(op);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

export {
    register,
    verify,
    getAll,
    getOne,
    updateOne,
    deleteOne,
};
