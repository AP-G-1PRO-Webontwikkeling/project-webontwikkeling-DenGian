import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";

const API_Lang =
	"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/json/programming-languages.json";
const API_Lib =
	"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/json/related-libraries.json";

//////////////////////////

async function getAllLang(): Promise<ProgrammingLanguage[]> {
	try {
		const response = await fetch(API_Lang);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const data = await response.json() as ProgrammingLanguage[];
		return data;
	} catch (error) {
		throw new Error(`An error occurred while fetching data: ${error}`);
	}
}

function filteredLanguages(languages: ProgrammingLanguage[] | undefined, searchTerm: string): ProgrammingLanguage[] {
    if (!languages) {
        return [];
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return languages.filter(language => language.name.toLowerCase().includes(lowerCaseSearchTerm));
}

function getCompareFunction(sortField: string, sortDirection: string): (a: ProgrammingLanguage, b: ProgrammingLanguage) => number {
    return (a: ProgrammingLanguage, b: ProgrammingLanguage) => {
        if (sortField === "name") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "birthDate") {
            return sortDirection === "asc" ? Date.parse(a.birthDate) - Date.parse(b.birthDate) : Date.parse(b.birthDate) - Date.parse(a.birthDate);
        } else if (sortField === "useCases") {
            const useCasesA = a.useCases.join(', ');
            const useCasesB = b.useCases.join(', ');
            return sortDirection === "asc" ? useCasesA.localeCompare(useCasesB) : useCasesB.localeCompare(useCasesA);
        } else if (sortField === "genre") {
            return sortDirection === "asc" ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre);
        } else if (sortField === "isActive") {
            return sortDirection === "asc" ? a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1 : a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1;
        }
        return 0;
    };
}

function sortLanguages(languages: ProgrammingLanguage[], sortField: string, sortDirection: string): ProgrammingLanguage[] {
    const compareFunction = getCompareFunction(sortField, sortDirection);
    return [...languages].sort(compareFunction);
}

function getDefaultSortDirection(sortField: string): string {
    return "asc";
}

async function getLanguageById(languageId: string): Promise<ProgrammingLanguage | null> {
    try {
        const allLanguages = await getAllLang();
        return allLanguages.find(language => language.id === languageId) || null;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

/////////////////////////////

async function getAllLibraries(): Promise<RelatedLibrary[]> {
	try {
		const response = await fetch(API_Lib);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const data = await response.json() as RelatedLibrary[];
		return data;
	} catch (error) {
		throw new Error(`An error occurred while fetching data: ${error}`);
	}
}

function filteredLibraries(libraries: RelatedLibrary[] | undefined, searchTerm: string): RelatedLibrary[] {
    if (!libraries) {
        return [];
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return libraries.filter(library => library.name.toLowerCase().includes(lowerCaseSearchTerm));
}

function getLibraryCompareFunction(sortField: string, sortDirection: string): (a: RelatedLibrary, b: RelatedLibrary) => number {
    return (a: RelatedLibrary, b: RelatedLibrary) => {
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
    };
}

function sortLibraries(libraries: RelatedLibrary[], sortField: string, sortDirection: string): RelatedLibrary[] {
    const compareFunction = getLibraryCompareFunction(sortField, sortDirection);
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

async function getLibraryById(libraryId: string): Promise<RelatedLibrary | null> {
    try {
        const allLibraries = await getAllLibraries();
        return allLibraries.find(library => library.id === libraryId) || null;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

export {getAllLang, filteredLanguages, sortLanguages, getLanguageById, getDefaultSortDirection, getAllLibraries, filteredLibraries, sortLibraries, getLibraryById };
