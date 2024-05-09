import express, { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { login } from "../config/database";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

export default router;