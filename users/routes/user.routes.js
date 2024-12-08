import { Router } from "express";
import auth from "../../middleware/auth.js";
import { statusCodes } from "../../helpers/statusCodes.js";
import { register, login, updateOne, deleteOne, getAll, getOne, changeBusinessStatus } from "../services/userDataAccessService.js";
import { minRole } from "../../middleware/minRole.js";
import { userRoles } from "../../helpers/roles.js";
import { isUser } from "../../middleware/isUser.js";
import { handleError } from "../../helpers/handleError.js";

const router = Router();
const { CREATED, INTERNAL_SERVER_ERROR } = statusCodes;

router.post("/", async (req, res) => {
    try {
        const user = await register(req.body);
        return res.status(CREATED).send(user);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const token = await login(req.body);
        return res.send(token);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.get("/", auth, minRole(userRoles.SUB_ADMIN), async (req, res) => {
    try {
        const users = await getAll();
        return res.send(users);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.get("/:id", auth, isUser, async (req, res) => {
    try {
        const user = await getOne(req.params.id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.put("/:id", auth, isUser, async (req, res) => {
    try {
        const newUser = await updateOne(req.params.id, req.body);
        return res.send(newUser);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.patch("/:id", auth, minRole(userRoles.SUB_ADMIN), async (req, res) => {
    try {
        const user = await changeBusinessStatus(req.params.id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.delete("/:id", auth, isUser, async (req, res) => {
    try {
        const user = await deleteOne(req.params.id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

export default router;