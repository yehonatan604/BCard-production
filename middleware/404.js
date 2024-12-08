export const Error404Handler = (req, res) => {
    handleError(res, 404, "Path not found");
};