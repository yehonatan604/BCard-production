import UserRole from "../users/models/UserRole.js";
import { handleError } from "../helpers/handleError.js";
import { statusCodes } from "../helpers/statusCodes.js";

const { FORBIDDEN, NOT_FOUND } = statusCodes;

export const minRole = (userRole) => (req, res, next) => {
    const role = UserRole.findOne({ user: req.userData._id });
    if (!role) return handleError(res, NOT_FOUND, "User role not found");

    if (role.role < userRole) return handleError(res, FORBIDDEN, "Authorization Error: You do not have the required role to access this resource");
    next();
};
