import express, { Request, Response } from "express";
import { getLibraryById, getFilteredAndSortedLibraries } from "../config/database";
import { RelatedLibrary } from "../interfaces/related-library.interface";
import { ISortlibraries } from "../interfaces/sort-libraries.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: number = req.query.sortDirection === "desc" ? -1 : 1;

        const sorted: ISortlibraries[] = await getFilteredAndSortedLibraries(searchTerm, sortField, sortDirection);

        res.render("libraries", {
            libraries: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection === 1 ? "asc" : "desc"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.body.searchTerm?.toString() ?? "";
        const sortField: string = req.query.sortField?.toString() ?? "name";
        const sortDirection: number = req.query.sortDirection === "desc" ? -1 : 1;

        const sorted: ISortlibraries[] = await getFilteredAndSortedLibraries(searchTerm, sortField, sortDirection);

        res.render("libraries", { 
            libraries: sorted,
            searchTerm: searchTerm,
            sortField: sortField,
            sortDirection: sortDirection === 1 ? "asc" : "desc"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

router.get("/:libraryId", async (req: Request, res: Response) => {
    try {
        const libraryId: string = req.params.libraryId;
        const library: RelatedLibrary | null = await getLibraryById(libraryId);
        if (!library) {
            res.status(404).render("404");
            return;
        }
        res.render("detail-library", { library });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("error");
    }
});

export default router;
