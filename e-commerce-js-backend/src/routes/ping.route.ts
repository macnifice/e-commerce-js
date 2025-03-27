import { Router } from "express";
import { getPong } from "../controllers/ping.controller";

const router: Router = Router();

router.get('/', getPong);

export { router };