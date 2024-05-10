import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";
import { User } from "../interfaces/user.interface";
import { isValidEmail } from "../utils/helper-functions";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

const client = new MongoClient(MONGODB_URI);

const collectionLanguages : Collection<ProgrammingLanguage> = client.db("opdracht").collection<ProgrammingLanguage>("languages");
const collectionLibraries : Collection<RelatedLibrary> = client.db("opdracht").collection<RelatedLibrary>("libraries");
const collectionUsers : Collection<User> = client.db("opdracht").collection<User>("users");

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

const saltRounds : number = 10;

async function createInitialAdmin() {
    try {
        const admin = await collectionUsers.findOne({ role: "ADMIN" });
        if (admin) {
            console.log("Admin user already exists. Skipping creation.");
            return;
        }
        const email: string | undefined = process.env.ADMIN_EMAIL;
        const password: string | undefined = process.env.ADMIN_PASSWORD;
        if (!email || !password) {
            throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables.");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await collectionUsers.insertOne({
            email,
            password: hashedPassword,
            role: "ADMIN"
        });
        console.log("Initial admin user created successfully.");
    } catch (error) {
        console.error("Error creating initial admin user:", error);
        throw new Error("Failed to create initial admin user.");
    }
}

async function createInitialUser() {
    try {
        const user = await collectionUsers.findOne({ role: "USER" });
        if (user) {
            console.log("User already exists. Skipping creation.");
            return;
        }
        const email: string | undefined = process.env.USER_EMAIL;
        const password: string | undefined = process.env.USER_PASSWORD;
        if (!email || !password) {
            throw new Error("USER_EMAIL and USER_PASSWORD must be set in environment variables.");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await collectionUsers.insertOne({
            email,
            password: hashedPassword,
            role: "USER"
        });
        console.log("Initial user created successfully.");
    } catch (error) {
        console.error("Error creating initial user:", error);
        throw new Error("Failed to create initial user.");
    }
}

async function login(email: string, password: string): Promise<User | null> {
    try {
        if (email === "" || password === "") {
            throw new Error("Email and password are required");
        }
        if (!isValidEmail(email)) {
            throw new Error("Invalid email format");
        }
        const user: User | null = await collectionUsers.findOne({ email: email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password ?? "");
            if (passwordMatch) {
                return user;
            } else {
                throw new Error("Incorrect email or password");
            }
        } else {
            throw new Error("Incorrect email or password");
        }
    } catch (error: any) {
        throw new Error(`Error during login: ${(error as Error).message}`);
    }
}

async function isEmailRegistered(email: string): Promise<boolean> {
    try {
        const existingUser = await collectionUsers.findOne({ email });
        return !!existingUser;
    } catch (error) {
        console.error("Error checking email registration:", error);
        throw new Error("Failed to check email registration.");
    }
}

async function isUsernameRegistered(username: string): Promise<boolean> {
    try {
        const existingUser = await collectionUsers.findOne({ username });
        return !!existingUser;
    } catch (error) {
        console.error("Error checking username registration:", error);
        throw new Error("Failed to check username registration.");
    }
}

async function registerUser(email: string, password: string, username: string): Promise<void> {
    try {
        const emailExists = await isEmailRegistered(email);
        if (emailExists) {
            throw new Error("Email is already registered.");
        }
        const usernameExists = await isUsernameRegistered(username);
        if (usernameExists) {
            throw new Error("Username is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await collectionUsers.insertOne({
            email,
            password: hashedPassword,
            username,
            role: "USER"
        });
        console.log("User registered successfully.");
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user.");
    }
}

///////////////////////////

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
        console.error("An error occurred while fetching languages:", error);
        throw new Error("Failed to fetch languages from the database");
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
        console.error("An error occurred while fetching libraries:", error);
        throw new Error("Failed to fetch libraries from the database");
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
    await createInitialAdmin();
    await createInitialUser();
    await loadLanguagesFromApi();
    await loadLibrariesFromApi();   
    process.on("SIGINT", async () => {
        console.log("\nSIGINT received. Shutting down...");
        await exit();
    });
    process.on("SIGTERM", async () => {
        console.log("\nSIGTERM received. Shutting down...");
        await exit();
    });
}

export { MONGODB_URI, connect, getAllLang, getLanguageById, filteredLanguages, getAllLibraries, getLibraryById, loadLanguagesFromApi, filteredLibraries, loadLibrariesFromApi, collectionLanguages, collectionLibraries, login, registerUser, isUsernameRegistered, isEmailRegistered };
