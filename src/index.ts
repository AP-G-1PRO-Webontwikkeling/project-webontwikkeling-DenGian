import * as readline from "readline-sync";
import * as helperFunctions from "./utils/helper-functions";

const main = async () => {
	helperFunctions.showMenu();
	const choice = helperFunctions.getUserChoice();

	switch (choice) {
		case 1:
			await helperFunctions.getAllLang();
			break;
		case 2:
			await helperFunctions.getAllLib();
			break;
		case 3:
			const id = readline.question("Please enter the ID you want to filter by [ex. LANG-001]: ");
			await helperFunctions.filterById(id);
		case 4:
			process.exit(0);
	}
};
main();

export {};
