import { handleError } from "../helpers/handleError.js";
import { userRoles } from "../helpers/roles.js";
import { statusCodes } from "../helpers/statusCodes.js";
import UserRole from "../users/models/UserRole.js";

const { FORBIDDEN, UNAUTHORIZED } = statusCodes;

export const isUser = (req, res, next) => {
    const user = req.user;
    if (!user) return handleError(res, UNAUTHORIZED, "Unauthorized: invalid token");

    const role = UserRole.findOne({ user: user._id });
    if (!role) return handleError(res, FORBIDDEN, "User role not found");

    const { id } = req.params;
    if (user._id !== id && role.role !== userRoles.ADMIN)
        return handleError(res, FORBIDDEN, "Authorization Error: You must be an admin type user or the registered user to see this user details");

    next();
};
