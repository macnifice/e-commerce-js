import { Router } from "express";
import { createOrder, getOrderByCustomerId, updateOrder, getOrdersByBusinessId } from "../controllers/purchase-order.controller";

const router = Router();

router.get("/business/:id", getOrdersByBusinessId);

router.get("customer/:id", getOrderByCustomerId);

router.post("/", createOrder);

router.put("change-status/:id/", updateOrder);


export { router };
