import dotenv from "dotenv";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";

dotenv.config();

async function getCompareFunction(sortField: string, sortDirection: string): Promise<(a: ProgrammingLanguage, b: ProgrammingLanguage) => number> {
    if (!['name', 'birthDate', 'useCases', 'genre', 'isActive'].includes(sortField)) {
        throw new Error(`Invalid sort field: ${sortField}`);
    }

    return (a: ProgrammingLanguage, b: ProgrammingLanguage) => {
        try {
            switch (sortField) {
                case "name":
                    return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                case "birthDate":
                    return sortDirection === "asc" ? Date.parse(a.birthdate) - Date.parse(b.birthdate) : Date.parse(b.birthdate) - Date.parse(a.birthdate);
                case "useCases":
                    const useCasesA = a.useCases.join(', ');
                    const useCasesB = b.useCases.join(', ');
                    return sortDirection === "asc" ? useCasesA.localeCompare(useCasesB) : useCasesB.localeCompare(useCasesA);
                case "genre":
                    return sortDirection === "asc" ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre);
                case "isActive":
                    return sortDirection === "asc" ? (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1) : (b.isActive === a.isActive ? 0 : b.isActive ? -1 : 1);
                default:
                    return 0;
            }
        } catch (error) {
            console.error("An error occurred while comparing languages:", error);
            return 0;
        }
    };
}

async function sortLanguages(languages: ProgrammingLanguage[], sortField: string, sortDirection: string): Promise<ProgrammingLanguage[]> {
    const compareFunction = await getCompareFunction(sortField, sortDirection);
    return [...languages].sort(compareFunction);
}

function getDefaultSortDirection(sortField: string): string {
    return "asc";
}

/////////////////////////////////

async function getLibraryCompareFunction(sortField: string, sortDirection: string): Promise<(a: RelatedLibrary, b: RelatedLibrary) => number> {
    if (!['name', 'website', 'stars', 'latestVersion'].includes(sortField)) {
        throw new Error(`Invalid sort field: ${sortField}`);
    }

    return (a: RelatedLibrary, b: RelatedLibrary) => {
        try {
            switch (sortField) {
                case "name":
                    return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                case "website":
                    return sortDirection === "asc" ? a.website.localeCompare(b.website) : b.website.localeCompare(a.website);
                case "stars":
                    return sortDirection === "asc" ? a.stars - b.stars : b.stars - a.stars;
                case "latestVersion":
                    return sortDirection === "asc" ? compareVersions(a.latestVersion, b.latestVersion) : compareVersions(b.latestVersion, a.latestVersion);
                default:
                    return 0;
            }
        } catch (error) {
            console.error("An error occurred while comparing libraries:", error);
            return 0;
        }
    };
}

async function sortLibraries(libraries: RelatedLibrary[], sortField: string, sortDirection: string): Promise<RelatedLibrary[]> {
    const compareFunction = await getLibraryCompareFunction(sortField, sortDirection);
    return [...libraries].sort(compareFunction);
}

function compareVersions(versionA: string, versionB: string): number {
    const partsA = versionA.split('.').map(part => parseInt(part, 10));
    const partsB = versionB.split('.').map(part => parseInt(part, 10));

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const partA = partsA[i] || 0;
        const partB = partsB[i] || 0;
        if (partA !== partB) {
            return partA - partB;
        }
    }
    return 0;
}

export { sortLanguages, getDefaultSortDirection, sortLibraries };