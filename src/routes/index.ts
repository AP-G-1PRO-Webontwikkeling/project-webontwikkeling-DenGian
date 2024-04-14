import express, { Request, Response } from "express";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";
import * as helperFunctions from "../utils/helper-functions";

const router = express.Router();

router.get("/", (req, res) => {
    res.type("text/html");
    res.render("index");
});

router.get("/contact", (req, res) => {
    res.type("text/html");
    res.render("contact");
});

router.get("/languages", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() || "";
        const sortField: string = req.query.sortField?.toString() || "name";
        const sortDirection: string = req.query.sortDirection?.toString() || "asc";

        const allLanguages = await helperFunctions.getAllLang();
        const filtered = helperFunctions.filteredLanguages(allLanguages, searchTerm);
        const sorted = helperFunctions.sortLanguages(filtered, sortField, sortDirection);

        res.render("languages", {
            languages: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        res.status(500);
    }
});

router.get("/languages/:languageId", async (req, res) => {
    try {
        const languageId = req.params.languageId;
        const language = await helperFunctions.getLanguageById(languageId);
        if (!language) {
            res.status(404).send("Language not found");
            return;
        }
        res.render("detail-language", { language });
    } catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
});

router.post("/languages", async (req, res) => {
    try {
        const sortField: string = req.query.sortField?.toString() || "name";
        const sortDirection: string = req.query.sortDirection?.toString() || "asc";
        const searchTerm: string = req.body.searchTerm;

        const allLanguages: ProgrammingLanguage[] = await helperFunctions.getAllLang();
        const filteredLanguages: ProgrammingLanguage[] = helperFunctions.filteredLanguages(allLanguages, searchTerm);
        const sortedLanguages: ProgrammingLanguage[] = helperFunctions.sortLanguages(filteredLanguages, sortField, sortDirection);

        res.render("languages", { 
            languages: sortedLanguages,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
});


//////////////////////////////


router.get("/libraries", async (req: Request, res: Response) => {
    try {
        const sortField: string = req.query.sortField?.toString() || "name";
        const sortDirection: string = req.query.sortDirection?.toString() || helperFunctions.getDefaultSortDirection(sortField);
        const searchTerm: string = req.query.searchTerm?.toString() || "";

        const allLibraries: RelatedLibrary[] = await helperFunctions.getAllLibraries();
        const filteredLibraries: RelatedLibrary[] = helperFunctions.filteredLibraries(allLibraries, searchTerm);
        const sortedLibraries: RelatedLibrary[] = helperFunctions.sortLibraries(filteredLibraries, sortField, sortDirection);

        res.render("libraries", { 
            libraries: sortedLibraries,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
});

router.get("/libraries/:libraryId", async (req, res) => {
    try {
        const libraryId = req.params.libraryId;
        const library = await helperFunctions.getLibraryById(libraryId);
        if (!library) {
            res.status(404).send("Library not found");
            return;
        }
        res.render("detail-library", { library });
    } catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
});

router.post("/libraries", async (req: Request, res: Response) => {
    try {
        const sortField: string = req.query.sortField?.toString() || "name";
        const sortDirection: string = req.query.sortDirection?.toString() || helperFunctions.getDefaultSortDirection(sortField);
        const searchTerm: string = req.body.searchTerm;

        const allLibraries: RelatedLibrary[] = await helperFunctions.getAllLibraries();
        const filteredLibraries: RelatedLibrary[] = helperFunctions.filteredLibraries(allLibraries, searchTerm);
        const sortedLibraries: RelatedLibrary[] = helperFunctions.sortLibraries(filteredLibraries, sortField, sortDirection);

        res.render("libraries", { 
            libraries: sortedLibraries,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500);
    }
});

export default router;
