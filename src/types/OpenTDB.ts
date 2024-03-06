import type { ZodType } from "zod";

import { z } from "zod";

export interface OpenTDBTriviaResponse {
    response_code: number;
    results: OpenTDBQuestion[];
}

export interface OpenTDBCategoryResponse {
    trivia_categories: OpenTDBCategory[];
}

export interface OpenTDBCategory {
    id: string;
    name: string;
}

export interface OpenTDBQuestion {
    category: string;
    correct_answer: string;
    difficulty: OpenTDBDifficulty;
    incorrect_answers: string[];
    question: string;
    type: OpenTDBType;
}

export interface OpenTDBDecodedQuestion {
    answers: string[];
    category: string;
    correctAnswer: string;
    difficulty: OpenTDBDifficulty;
    incorrectAnswers: string[];
    question: string;
    type: OpenTDBType;
}

export type OpenTDBDifficulty = "easy" | "hard" | "medium";

export type OpenTDBType = "any" | "boolean" | "multiple";

//validators

export const OpenTDBTriviaResponseValidator = z.object({
    response_code: z.number(),
    results: z.array(
        z.object({
            category: z.string(),
            correct_answer: z.string(),
            difficulty: z.union([
                z.literal("easy"),
                z.literal("medium"),
                z.literal("hard"),
            ]) satisfies ZodType<OpenTDBDifficulty>,
            incorrect_answers: z.array(z.string()),
            question: z.string(),
            type: z.union([
                z.literal("multiple"),
                z.literal("boolean"),
            ]) satisfies ZodType<OpenTDBType>,
        })
    ),
}) satisfies ZodType<OpenTDBTriviaResponse>;

export const OpenTDBCategoryResponseValidator = z.object({
    trivia_categories: z.array(
        z.object({
            id: z.coerce.string(),
            name: z.string(),
        })
    ),
}) satisfies ZodType<OpenTDBCategoryResponse>;
