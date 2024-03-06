import type { OpenTDBQuestion, OpenTDBDecodedQuestion } from "~/types/OpenTDB";

export function decodeQuestion({
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
}: OpenTDBQuestion): OpenTDBDecodedQuestion {
    function decURI<T extends string>(str: T) {
        return decodeURIComponent(str) as unknown as T;
    }
    return {
        category: decURI(category),
        correctAnswer: decURI(correct_answer),
        difficulty: decURI(difficulty),
        incorrectAnswers: incorrect_answers.map(decURI),
        question: decURI(question),
        type: decURI(type),
        answers: [
            decURI(correct_answer),
            ...incorrect_answers.map(decURI),
        ].sort(() => Math.random() - 0.5),
    };
}
