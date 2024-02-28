import * as readline from "readline-sync";
import { ProgrammingLanguage } from "../interfaces/programming-language.interface";
import { RelatedLibrary } from "../interfaces/related-library.interface";
// import languages from "../../assets/json/programming-languages.json";
// import libraries from "../../assets/json/related-libraries.json";

const menuItems: string[] = [
	"View all languages ",
	"View all libraries ",
	"Filter by ID ",
	"Exit ",
];
const API_Lang =
	"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/json/programming-languages.json";
const API_Lib =
	"https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/json/related-libraries.json";

const showMenu = () => {
	console.log("Welcome to the JSON data viewer!");
	console.log("");
	for (let i = 0; i < menuItems.length; i++) {
		console.log(`${i + 1}. ${menuItems[i]}`);
	}
};

const getUserChoice = (): number => {
	let userChoice: number;
	do {
		userChoice = readline.questionInt("Please enter your choice: ");
	} while (isNaN(userChoice) || userChoice < 1 || userChoice > menuItems.length);
	return userChoice;
};

async function getAllLang() {
	try {
		const response = await fetch(API_Lang);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const data = (await response.json()) as ProgrammingLanguage[];
		if (data.length === 0) {
			console.log("No programming languages found.");
		} else {
			for (const lang of data) {
				console.log(`- ${lang.name} (${lang.id})`);
			}
		}
	} catch (error) {
		console.log(` an error occured! ${error}`);
	}
}

async function getAllLib() {
	try {
		const response = await fetch(API_Lib);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const data = (await response.json()) as RelatedLibrary[];
		if (data.length === 0) {
			console.log("No librarues found.");
		} else {
			for (const lib of data) {
				console.log(`- ${lib.name} (${lib.id})`);
			}
		}
	} catch (error) {
		console.log(` an error occured! ${error}`);
	}
}

async function filterById(id: string) {
	try {
		const response = await fetch(API_Lang);
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		const data = (await response.json()) as ProgrammingLanguage[];
		const filteredLanguage = data.find((language) => language.id === id);
		if (filteredLanguage) {
			console.log("");
			console.log(`- ${filteredLanguage.name} (${filteredLanguage.id})`);
			console.log(`   - Description: ${filteredLanguage.description}`);
			console.log(`   - Age: ${filteredLanguage.age}`);
			console.log(`   - IsActive: ${filteredLanguage.isActive}`);
			console.log(`   - BirthDate: ${filteredLanguage.birthDate}`);
			console.log(`   - ImageUrl: ${filteredLanguage.imageUrl}`);
			console.log(`   - Genre: ${filteredLanguage.genre}`);
			console.log(`   - UseCases: ${filteredLanguage.useCases.join(", ")}`);
			console.log("   - Related Library:");
			console.log(`       - ID: ${filteredLanguage.relatedLibrary.id}`);
			console.log(`       - Name: ${filteredLanguage.relatedLibrary.name}`);
			console.log(`       - Description: ${filteredLanguage.relatedLibrary.description}`);
			console.log(`       - Website: ${filteredLanguage.relatedLibrary.website}`);
			console.log(`       - Stars: ${filteredLanguage.relatedLibrary.stars}`);
			console.log(`       - LatestVersion: ${filteredLanguage.relatedLibrary.latestVersion}`);
		} else {
			console.log("Language not found.");
		}
	} catch (error) {
		console.log(error);
	}
}

export { showMenu, getUserChoice, getAllLang, getAllLib, filterById };
