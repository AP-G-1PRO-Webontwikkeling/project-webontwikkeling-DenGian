import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017");

const collectionLanguages : Collection<ProgrammingLanguage> = client.db("opdracht").collection<ProgrammingLanguage>("languages");
const collectionLibraries : Collection<RelatedLibrary> = client.db("opdracht").collection<RelatedLibrary>("libraries");

const API_Lang = process.env.API_LANG_URL ?? "https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/programming-languages.json";
const API_Lib = process.env.API_LIB_URL ?? "https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/related-libraries.json";


async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

async function fetchLanguagesFromAPI() {
    const response = await fetch(API_Lang);
    if (!response.ok) {
        throw new Error(`API fetch for languages failed with status: ${response.status}`);
    }
    return response.json();
}

async function loadLanguagesFromApi() {
    const exists = await collectionLanguages.countDocuments();
    if (exists === 0) {
        console.log("No languages found in database, loading from API...");
        try {
            const languages = await fetchLanguagesFromAPI();
            await collectionLanguages.insertMany(languages);
            console.log("Languages loaded and inserted into the database.");
        } catch (error) {
            console.error("Failed to load languages from API: ", error);
        }
    } else {
        console.log("Languages already exist in the database.");
    }
}

async function getAllLang(): Promise<ProgrammingLanguage[]> {
    try {
        const data = await collectionLanguages.find({}).toArray();
        return data;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

async function filteredLanguages(searchTerm: string): Promise<ProgrammingLanguage[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    try {
        const searchResult = await collectionLanguages.find({
            name: { $regex: lowerCaseSearchTerm, $options: "i" }
        }).toArray();
        return searchResult;
    } catch (error) {
        console.error("An error occurred while filtering languages:", error);
        return [];
    }
}

async function getLanguageById(languageId: string): Promise<ProgrammingLanguage | null> {
    try {
        return await collectionLanguages.findOne({ id: languageId }) || null;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

export async function updateLanguage(languageId: string, updatedLanguage: ProgrammingLanguage) {
    try {
        await collectionLanguages.updateOne({ id: languageId }, { $set: updatedLanguage });
    } catch (error) {
        throw new Error(`An error occurred while updating language: ${error}`);
    }
}

//////////////////////////////

async function fetchLibrariesFromAPI() {
    const response = await fetch(API_Lib);
    if (!response.ok) {
        throw new Error(`API fetch for libraries failed with status: ${response.status}`);
    }
    return response.json();
}

async function loadLibrariesFromApi() {
    const exists = await collectionLibraries.countDocuments();
    if (exists === 0) {
        console.log("No libraries found in database, loading from API...");
        try {
            const libraries = await fetchLibrariesFromAPI();
            await collectionLibraries.insertMany(libraries);
            console.log("Libraries loaded and inserted into the database.");
        } catch (error) {
            console.error("Failed to load libraries from API: ", error);
        }
    } else {
        console.log("Libraries already exist in the database.");
    }
}

async function getAllLibraries(): Promise<RelatedLibrary[]> {
    try {
        const data = await collectionLibraries.find({}).toArray();
        return data;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

async function filteredLibraries(searchTerm: string): Promise<RelatedLibrary[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    try {
        const searchResult = await collectionLibraries.find({
            name: { $regex: lowerCaseSearchTerm, $options: "i" }
        }).toArray();
        return searchResult;
    } catch (error) {
        console.error("An error occurred while filtering libraries:", error);
        return [];
    }
}

async function getLibraryById(libraryId: string): Promise<RelatedLibrary | null> {
    try {
        return await collectionLibraries.findOne({ id: libraryId }) || null;
    } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error}`);
    }
}

async function connect() {
    await client.connect();
    console.log("Connected to database");
    await loadLanguagesFromApi();
    await loadLibrariesFromApi();   
    process.on("SIGINT", async () => {
        console.log("SIGINT received. Shutting down.");
        await exit();
    });
    process.on("SIGTERM", async () => {
        console.log("SIGTERM received. Shutting down.");
        await exit();
    });
    
}

export { connect, getAllLang, getLanguageById, filteredLanguages, getAllLibraries, getLibraryById, loadLanguagesFromApi, filteredLibraries, loadLibrariesFromApi, collectionLanguages, collectionLibraries };
