import express from "express";
import activateController from "../controllers/activate-controller.js";
import authController from "../controllers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import roomsController from "../controllers/room-controller.js";

const routes = express.Router();

routes.post("/api/send-otp", authController.sendOtp);
routes.post("/api/verify-otp", authController.verifyOtp);
routes.post("/api/activate", authMiddleware, activateController.activate);
routes.get("/api/refresh", authMiddleware, authController.refresh);
routes.get("/api/refresh", authMiddleware, authController.refresh);
routes.post("/api/signout", authMiddleware, authController.logout);
routes.post("/api/rooms", authMiddleware, roomsController.create);
routes.get("/api/rooms", authMiddleware, roomsController.getRooms);
routes.get("/api/rooms/:roomId", authMiddleware, roomsController.getRoom);

export default routes;
