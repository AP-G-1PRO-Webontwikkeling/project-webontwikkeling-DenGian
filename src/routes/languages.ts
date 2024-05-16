import express, { Request, Response } from "express";
import { filteredLanguages, getLanguageById, updateLanguage, getAllLangSorted } from "../config/database";
import { adminMiddleware } from "../middleware/handleAdminRoutes";
import { getDefaultSortDirection, sortLanguages } from "../utils/helper-functions";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { UpdateProgrammingLanguage } from "../interfaces/update-programming-language.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: string = req.query.sortDirection?.toString() ?? getDefaultSortDirection(sortField);

        const userRole = req.session.user ? req.session.user.role : null;

        const filtered = await filteredLanguages(searchTerm);

        const sorted = await sortLanguages(filtered, sortField, sortDirection);

        res.render("languages", {
            languages: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection,
            userRole: userRole
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.post("/", async (req, res) => {
    try {
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: string = req.query.sortDirection?.toString() ?? getDefaultSortDirection(sortField);
        const searchTerm: string = req.body.searchTerm;

        const filteredLanguagesResult: ProgrammingLanguage[] = await filteredLanguages(searchTerm);
        const sortedLanguages: ProgrammingLanguage[] = await sortLanguages(filteredLanguagesResult, sortField, sortDirection);

        res.render("languages", { 
            languages: sortedLanguages,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.get("/:languageId", async (req, res) => {
    try {
        const languageId = req.params.languageId;
        const language = await getLanguageById(languageId);
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

router.get("/:languageId/update", adminMiddleware, async (req, res) => {
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

router.post("/:languageId/update", adminMiddleware, async (req, res) => {
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
