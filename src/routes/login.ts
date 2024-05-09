import express, { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { login } from "../config/database";

const router = express.Router();

router.get("/", (req, res) => {
    res.type("text/html");
    res.render("login");
});

router.post("/", async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
        let user: User | null = await login(email, password);
        if (user) {
            delete user.password; 
            req.session.user = user;
            req.session.message = {type: "success", message: "Login successful"};
            res.redirect("/languages");
        } else {
            res.redirect("/login");
        }
    } catch (e: any) {
        req.session.message = {type: "error", message: e.message};
        console.error("Error during login:", e);
        res.redirect("/login");
    }
});

export default router;