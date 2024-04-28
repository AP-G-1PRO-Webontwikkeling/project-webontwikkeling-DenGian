import { ObjectId } from "mongodb";

export interface ProgrammingLanguage {
    _id: ObjectId;
    id: string;
    name: string;
    description: string;
    age: number;
    isActive: boolean;
    birthDate: Date;
    imageUrl: string;
    genre: string;
    useCases: string[];
    relatedLibrary: {
        id: string;
        name: string;
        imageUrl: string;
        description: string;
        website: string;
        stars: number;
        latestVersion: string;
    };
}
