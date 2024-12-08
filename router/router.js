import { Router } from "express";
import { Error404Handler } from "../middleware/404.js";
import { envService } from "../services/Env/envService.js";
import usersRouter from "../users/routes/user.routes.js";

const router = Router();
const { API_VERSION } = envService;

router.get('/', (req, res) => {
    res.send(`Welcome to BCard API ${API_VERSION}`);
});

router.use('users', usersRouter)

router.use(Error404Handler);

export default router;
