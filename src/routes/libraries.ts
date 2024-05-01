import express, { Request, Response } from "express";
import { getAllLibraries, filteredLibraries, getLibraryById } from "../config/database";
import { sortLibraries, getDefaultSortDirection } from "../utils/helper-functions";
import { RelatedLibrary } from "../interfaces/related-library.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: string = req.query.sortDirection?.toString() ?? getDefaultSortDirection(sortField);

        const allLibraries = await getAllLibraries();
        let filtered = allLibraries;

        if (searchTerm) {
            filtered = await filteredLibraries(searchTerm);
        }

        const sorted = await sortLibraries(filtered, sortField, sortDirection);

        res.render("libraries", {
            libraries: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:libraryId", async (req, res) => {
    try {
        const libraryId = req.params.libraryId;
        const library = await getLibraryById(libraryId);
        if (!library) {
            res.status(404).send("Library not found");
            return;
        }
        res.render("detail-library", { library });
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

        const filteredLibrariesResult: RelatedLibrary[] = await filteredLibraries(searchTerm);
        const sortedLibraries: RelatedLibrary[] = await sortLibraries(filteredLibrariesResult, sortField, sortDirection);

        res.render("libraries", { 
            libraries: sortedLibraries,
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