import express, { Request, Response } from "express";
import { getLanguageById, updateLanguage, getFilteredAndSortedLanguages } from "../config/database";
import { adminMiddleware } from "../middleware/handleAdminRoutes";
import { UpdateProgrammingLanguage } from "../interfaces/update-programming-language.interface";
import { ISortProgrammingLanguage } from "../interfaces/sort-languages.interface";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: number = req.query.sortDirection === "desc" ? -1 : 1;

        const userRole: string | null = req.session.user ? req.session.user.role : null;

        const sorted: ISortProgrammingLanguage[] = await getFilteredAndSortedLanguages(searchTerm, sortField, sortDirection);

        res.render("languages", {
            languages: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection === 1 ? "asc" : "desc",
            userRole: userRole
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: number = req.query.sortDirection === "desc" ? -1 : 1;

        const userRole: string | null = req.session.user ? req.session.user.role : null;

        const sorted: ISortProgrammingLanguage[] = await getFilteredAndSortedLanguages(searchTerm, sortField, sortDirection);

        res.render("languages", { 
            languages: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection === 1 ? "asc" : "desc",
            userRole: userRole
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.get("/:languageId", async (req: Request, res: Response) => {
    try {
        const languageId: string = req.params.languageId;
        const language: ProgrammingLanguage | null = await getLanguageById(languageId);
        if (!language) {
            res.status(404).render("404");
            return;
        }
        res.render("detail-language", { language });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.get("/:languageId/update", adminMiddleware, async (req: Request, res: Response) => {
    try {
        const languageId: string = req.params.languageId;
        const language: UpdateProgrammingLanguage | null = await getLanguageById(languageId);
        if (!language) {
            return res.status(404).render("404");
        }
        res.render("edit-language", { language });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.post("/:languageId/update", adminMiddleware, async (req: Request, res: Response) => {
    try {
        const languageId: string = req.params.languageId;
        const { name, birthdate, genre, isActive, description, useCases }: UpdateProgrammingLanguage = req.body;

        const updatedLanguageData: UpdateProgrammingLanguage | any = {
            name,
            birthdate,
            genre,
            isActive: isActive === "on",
            description,
            useCases: useCases ? [...useCases] : []
        };

        await updateLanguage(languageId, updatedLanguageData);

        res.redirect("/languages");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

export default router;
