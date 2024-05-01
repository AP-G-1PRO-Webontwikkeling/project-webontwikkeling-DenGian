import { ObjectId } from "mongodb";

export interface RelatedLibrary {
	_id: ObjectId;
	id: string;
	name: string;
	imageUrl: string;
	description: string;
	website: string;
	stars: number;
	latestVersion: string;
}
