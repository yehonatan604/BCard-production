import lodash from "lodash";
import { comparePassword, hashPassword } from "../helpers/password.js";
import { generateAuthToken } from "../../services/Auth/authService.js";
import User from "../models/User.js";
import UserRole from "../models/UserRole.js";
import { userRoles } from "../../helpers/roles.js";
import { statusCodes } from "../../helpers/statusCodes.js";

const { BAD_REQUEST, NOT_FOUND } = statusCodes;
const { pick } = lodash;

const register = async (data) => {
    try {
        const { email } = data;
        let user = await findOne({ email });
        if (user) throw new Error("User already registered");

        user.password = await hashPassword(user.password);
        user = new User(data);
        user = await user.save();

        user = pick(user, ["name", "email"]);

        const response = {
            message: "User registered successfully",
            user,
        };

        return Promise.resolve(response);
    } catch (error) {
        error.status = BAD_REQUEST;
        return Promise.reject(error);
    }
};

const login = async ({ email, password }) => {
    try {
        const user = await findOne({ email });
        if (!user)
            throw new Error("Authentication Error: Invalid email or password");

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) throw new Error("Authentication Error: Invalid email or password");

        const token = generateAuthToken(user);

        return Promise.resolve(token);
    } catch (error) {
        error.status = BAD_REQUEST;
        return Promise.reject(error);
    }
};

const getAll = async () => {
    try {
        const users = await find();
        if (!users || users.length === 0) throw new Error("No users found in the database");

        return Promise.resolve(users);
    } catch (error) {
        error.status = NOT_FOUND;
        return Promise.reject(error);
    }
};

const getOne = async (userId) => {
    try {
        const user = await findById(userId);
        if (!user) throw new Error("Could not find this user in the database");

        return Promise.resolve(user);
    } catch (error) {
        error.status = NOT_FOUND;
        return Promise.reject(error);
    }
};

const updateOne = async (userId, data) => {
    try {
        const user = await findByIdAndUpdate(userId, data, {
            new: true,
        });
        if (!user) throw new Error("Could not find this user in the database");

        return Promise.resolve(user);
    } catch (error) {
        error.status = BAD_REQUEST;
        return Promise.reject(error);
    }
};

const changeBusinessStatus = async (userId) => {
    try {
        const user = await findById(userId);
        if (!user) throw new Error("Could not find this user in the database");


        const userRole = UserRole.findOne({ user: userId });
        if (!userRole) throw new Error("Could not find this user's role in the database!!!");
        userRole.role = userRole.role === userRoles.USER ? userRoles.BIZ : userRoles.USER;

        const response = {
            message: "User business status changed successfully",
            user: pick(user, ["name", "email"]),
            userRole,
        };

        return Promise.resolve(response);
    } catch (error) {
        error.status = BAD_REQUEST;
        return Promise.reject(error);
    }
};

const deleteOne = async (userId) => {
    try {
        const role = UserRole.findOne({ user: userId });
        if (!role) throw new Error("Could not find this user's role in the database");
        if (role.role === userRoles.ADMIN) throw new Error("Cannot delete an admin user from the database");

        const user = await findByIdAndDelete(userId);

        if (!user)
            throw new Error(
                "Could not delete this user because a user with this ID cannot be found in the database"
            );
        return Promise.resolve(user);
    } catch (error) {
        error.status = BAD_REQUEST;
        return Promise.reject(error);
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
