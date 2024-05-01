import express, { Request, Response } from "express";
import { filteredLanguages, getLanguageById, getAllLang, updateLanguage } from "../config/database";
import { sortLanguages, getDefaultSortDirection } from "../utils/helper-functions";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: string = req.query.sortDirection?.toString() ?? getDefaultSortDirection(sortField);

        const allLanguages = await getAllLang();
        let filtered = allLanguages;

        if (searchTerm) {
            filtered = await filteredLanguages(searchTerm);
        }

        const sorted = await sortLanguages(filtered, sortField, sortDirection);

        res.render("languages", {
            languages: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:languageId", async (req, res) => {
    try {
        const languageId = req.params.languageId;
        const language = await getLanguageById(languageId);
        if (!language) {
            res.status(404).send("Language not found");
            return;
        }
        res.render("detail-language", { language });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:languageId/update", async (req, res) => {
    try {
        const languageId: string = req.params.languageId;
        const language: ProgrammingLanguage | null = await getLanguageById(languageId);
        
        if (!language) {
            return res.status(404).send("Language not found");
        }

        res.render("edit-language", { language });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/:languageId/update", async (req, res) => {
    try {
        const languageId: string = req.params.languageId;
        const updatedLanguageData: ProgrammingLanguage = req.body;
        updatedLanguageData.isActive = req.body.isActive === "on" ? true : false;

        await updateLanguage(languageId, updatedLanguageData);

        res.redirect("/languages");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
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
        res.status(500).send("Internal Server Error");
    }
});

export default router;
