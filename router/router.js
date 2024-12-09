import { Router } from "express";
import { Error404Handler } from "../middleware/404.js";
import { envService } from "../services/Env/envService.js";
import usersRouter from "../users/routes/user.routes.js";
import opRouter from "../users/routes/op.routes.js";
import cardsRouter from "../cards/routes/card.routes.js";

const router = Router();
const { API_VERSION } = envService;

router.get('/', (req, res) => {
    res.send(`Welcome to BCard API ${API_VERSION}`);
});

router.use('users', usersRouter);
router.use('ops', opRouter);
router.use('cards', cardsRouter);

router.use(Error404Handler);

export default router;
