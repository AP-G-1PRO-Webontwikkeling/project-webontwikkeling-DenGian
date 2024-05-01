import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.type("text/html");
    res.render("index");
});

export default router;
