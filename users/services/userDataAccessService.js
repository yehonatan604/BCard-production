import lodash from "lodash";
import { comparePassword, hashPassword } from "../helpers/password.js";
import { generateAuthToken } from "../../services/Auth/authService.js";
import User from "../models/User.js";
import UserRole from "../models/UserRole.js";
import { userRoles } from "../../helpers/roles.js";
import { statusCodes } from "../../helpers/statusCodes.js";
import { handleError } from "../../helpers/handleError.js";
import Op from "../models/Op.js";

const { BAD_REQUEST, NOT_FOUND } = statusCodes;
const { pick } = lodash;

const register = async (data, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const { email } = data;
        let user = await User.findOne({ email });
        if (user) throw new Error("User already registered");

        user.password = await hashPassword(user.password);
        user = new User(data);
        user = await user.save();
        user = pick(user, ["name", "email", "op"])

        const role = new UserRole({ user: user._id, role: userRoles.USER || userRoles.USER });
        role = await role.save();

        return Promise.resolve({ user, role });
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user)
            throw new Error("Authentication Error: Invalid email or password");

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) throw new Error("Authentication Error: Invalid email or password");

        const token = await generateAuthToken(user);
        const role = await UserRole.findOne({ user: user._id });

        return Promise.resolve({ token, role });
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const getAll = async (opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const users = await User.find({ op });
        if (!users || users.length === 0) throw new Error("No users found in the database");

        return Promise.resolve(users);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const getOne = async (userId, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const user = await User.findOne({ _id: userId, op });
        if (!user) throw new Error("Could not find this user in the database");

        const role = await UserRole.findOne({ user: userId });
        if (!role) throw new Error("Could not find this user's role in the database");

        return Promise.resolve({ user, role });
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const updateOne = async (userId, data, opId) => {
    try {
        const role = UserRole.findOne({ user: userId });
        if (!role) throw new Error("Could not find this user's role in the database");
        if (role.role === userRoles.ADMIN) throw new Error("Cannot update an admin user");

        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const user = await User.findAndUpdate({ _id: userId, op }, data, { new: true });
        if (!user) throw new Error("Could not find this user in the database");

        return Promise.resolve(user);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const changeBusinessStatus = async (userId, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const role = UserRole.findOne({ user: userId });
        if (!role) throw new Error("Could not find this user's role in the database");
        if (role.role === userRoles.ADMIN) throw new Error("Cannot change the admin's status");

        const user = await User.findOne({ _id: userId, op });
        if (!user) throw new Error("Could not find this user in the database");

        role.role = role.role === userRoles.USER ? userRoles.BIZ : userRoles.USER;

        return Promise.resolve({ user: pick(user, ["name", "email"]), userRole });
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const deleteOne = async (userId, opId) => {
    try {
        const role = UserRole.findOne({ user: userId });
        if (!role) throw new Error("Could not find this user's role in the database");
        if (role.role === userRoles.ADMIN) throw new Error("Cannot delete an admin user from the database");

        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const user = await User.findOneAndDelete({ _id: userId, op });

        if (!user)
            throw new Error(
                "Could not delete this user because a user with this ID cannot be found in the database"
            );
        return Promise.resolve(user);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

export {
    register,
    login,
    getAll,
    getOne,
    updateOne,
    changeBusinessStatus,
    deleteOne,
};
