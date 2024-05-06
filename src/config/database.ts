import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");

const collectionLanguages : Collection<ProgrammingLanguage> = client.db("opdracht").collection<ProgrammingLanguage>("languages");
const collectionLibraries : Collection<RelatedLibrary> = client.db("opdracht").collection<RelatedLibrary>("libraries");

const API_Lang =
	"https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/programming-languages.json";
const API_Lib =
	"https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/related-libraries.json";

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

async function loadLanguagesFromApi(collectionLanguages: Collection<ProgrammingLanguage>) {
    try {
        console.log("Loading languages from API...");
        const response = await fetch(API_Lang);
        const languages = await response.json();

        if (languages.length > 0) {
            console.log("Database is empty or needs update, clearing and loading languages from API");
            await collectionLanguages.deleteMany({});
            await collectionLanguages.insertMany(languages);
        } else {
            console.log("Database is up to date, no action needed");
        }
    } catch (error) {
        console.error("An error occurred while loading languages from API: ", error);
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

async function loadLibrariesFromApi(collectionLibraries: Collection<RelatedLibrary>) {
    try {
        console.log("Loading libraries from API...");
        const response = await fetch(API_Lib);
        const libraries = await response.json();

        if (libraries.length > 0) {
            console.log("Database is empty or needs update, clearing and loading libraries from API");
            await collectionLibraries.deleteMany({});
            await collectionLibraries.insertMany(libraries);
        } else {
            console.log("Database is up to date, no action needed");
        }
    } catch (error) {
        console.error("An error occurred while loading libraries from API: ", error);
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
    try {
        await client.connect();
        await loadLanguagesFromApi(collectionLanguages);
        await loadLibrariesFromApi(collectionLibraries);   
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}

export { connect, getAllLang, getLanguageById, filteredLanguages, getAllLibraries, getLibraryById, loadLanguagesFromApi, filteredLibraries, loadLibrariesFromApi, collectionLanguages, collectionLibraries };
