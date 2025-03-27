import { Router } from "express";
import { verifyUser } from "../controllers/user.controller";


const router: Router = Router();

router.put('/verify/:id', verifyUser);

export { router };


