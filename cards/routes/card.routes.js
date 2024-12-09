import { Router } from "express";
import auth from "../../middleware/auth.js";
import { statusCodes } from "../../helpers/statusCodes.js";
import { create, updateOne, deleteOne, getAll, getOne } from "../services/cardDataAccessService.js";
import { minRole } from "../../middleware/minRole.js";
import { userRoles } from "../../helpers/roles.js";
import { isUser } from "../../middleware/isUser.js";
import { handleError } from "../../helpers/handleError.js";
import { validate } from "../../middleware/validation.js";
import { createCardSchema as schema } from "../validations/cardSchema.js";

const router = Router();
const { CREATED, INTERNAL_SERVER_ERROR } = statusCodes;

router.post("/", auth, minRole(userRoles.BIZ), validate(schema), async (req, res) => {
    try {
        const card = await create(req.body, req.user.op);
        return res.status(CREATED).send(card);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.get("/all/:op", async (req, res) => {
    try {
        const cards = await getAll(req.params.op);
        return res.send(cards);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.get("/one//:op/:id", auth, isUser, async (req, res) => {
    try {
        const card = await getOne(req.params.id, req.params.op);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.put("/:id", auth, isUser, minRole(userRoles.BIZ), validate(schema), async (req, res) => {
    try {
        const card = await updateOne(req.params.id, req.body, req.user.op);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

router.delete("/:id", auth, isUser, minRole(userRoles.BIZ), async (req, res) => {
    try {
        const card = await deleteOne(req.params.id, req.user.op);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || INTERNAL_SERVER_ERROR, error.message);
    }
});

export default router;