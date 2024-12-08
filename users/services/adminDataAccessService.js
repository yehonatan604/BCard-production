import lodash from "lodash";
import { generateRegisterToken } from "../../services/Auth/authService.js";
import { handleBadRequest } from "../../utils/handleErrors";
import { sendMail } from "../../services/Mail/mailService.js";
import { registerMail } from "../../services/Mail/mails/register.mail.js";
import ClassCode from "../models/ClassCode.js";
import Admin from "../models/Admin.js";

const { pick } = lodash;

const register = async (data) => {
    try {
        const { _id, email, name, classCode } = data;

        let admin = await Admin.findOne({ email });
        if (admin) throw new Error("Admin already registered");

        const classCodeExists = await ClassCode.findOne({ classCode });
        if (!classCodeExists) throw new Error("Invalid class code");

        const emailVerifyToken = generateRegisterToken(_id);
        const mailContent = registerMail(admin.email, `${name.first} ${name.last}`, emailVerifyToken);
        const mail = await sendMail(mailContent);
        if (!mail) throw new Error("Could not send email verification mail");

        admin = new Admin(data);
        admin = await admin.save();
        admin = pick(admin, ["name", "email"]);

        const response = {
            message: "Admin registered successfully. please check your email to verify your account",
            admin,
        };

        return Promise.resolve(response);
    } catch (error) {
        error.status = 400;
        return Promise.reject(error);
    }
};

const verify = async (token) => {
    try {
        const { _id } = verifyRegisterToken(token);
        if (!_id) throw new Error("Invalid token");

        let admin = await Admin.findById(_id);
        if (!admin) throw new Error("Could not find this Admin in the database");

        admin.isVerified = true;
        admin = await admin.save();

        return Promise.resolve(admin);
    } catch (error) {
        error.status = 400;
        return Promise.reject(error);
    }
};

const getAll = async () => {
    try {
        const admins = await Admin.find();
        return Promise.resolve(admins);
    } catch (error) {
        error.status = 404;
        return Promise.reject(error);
    }
};

const getOne = async (userId) => {
    try {
        let admin = await Admin.findById(userId);
        if (!admin) throw new Error("Could not find this Admin in the database");
        return Promise.resolve(admin);
    } catch (error) {
        error.status = 404;
        return handleBadRequest("Mongoose", error);
    }
};

const updateOne = async (userId, normalizedUser) => {
    try {
        const admin = await Admin.findByIdAndUpdate(userId, normalizedUser, {
            new: true,
        });
        if (!admin) throw new Error("Could not find this Admin in the database");
        return Promise.resolve(admin);
    } catch (error) {
        error.status = 400;
        return Promise.reject(error);
    }
};


const deleteOne = async (userId) => {
    try {
        const admin = await Admin.findByIdAndDelete(userId);
        if (!admin) throw new Error("Could not find this Admin in the database");

        admin = pick(admin, ["name", "email"]);

        return Promise.resolve(admin);
    } catch (error) {
        error.status = 400;
        return Promise.reject(error);
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
