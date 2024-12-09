import { handleError } from "../helpers/handleError.js";

export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        handleError(res, 400, error.message);
    }
};