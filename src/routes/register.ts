import express, { Request, Response } from "express";
import { registerUser, isEmailRegistered, isUsernameRegistered } from "../config/database";
import { validateFormData } from "../middleware/handleFormValidation";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.type("text/html");
    const formData = req.session.formData || {};
    res.render("register", {formData});
});

router.post("/", validateFormData, async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).render("niceTry");
        }
        const emailExists = await isEmailRegistered(email);
        if (emailExists) {
            req.session.message = { type: "error", message: "Email is already registered." };
            return res.redirect("/register");
        }
        const usernameExists = await isUsernameRegistered(username);
        if (usernameExists) {
            req.session.message = { type: "error", message: "Username is already taken." };
            return res.redirect("/register");
        }
        await registerUser(email, password, username);
        req.session.message = { type: "success", message: "Registration successful" };
        res.redirect("/login");
    } catch (e: any) {
        req.session.message = { type: "error", message: e.message };
        console.error("Error registering user:", e);
        res.status(500).redirect("/register");
    }
});

export default router;
