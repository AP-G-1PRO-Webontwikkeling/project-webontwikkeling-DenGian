export interface ProgrammingLanguage {
	id: string;
	name: string;
	description: string;
	age: number;
	isActive: boolean;
	birthDate: string;
	imageUrl: string;
	genre: string;
	useCases: string[];
	relatedLibrary: {
		id: string;
		name: string;
		description: string;
		website: string;
		stars: number;
		latestVersion: string;
	};
}
