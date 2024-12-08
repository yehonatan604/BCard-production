import { handleError } from "../helpers/handleError.js";

export const ErrorMiddleware = (err, req, res, next) => {
    handleError(res, 500, 'Internal error ' + err.message);
};