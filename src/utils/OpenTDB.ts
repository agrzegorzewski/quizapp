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

export function formatTime(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const msText = ((ms / 100) % 10).toString().padStart(1, "0");
    const secondsText = (seconds % 60).toString().padStart(2, "0");
    const minutesText = minutes.toString().padStart(2, "0");
    return `${minutesText}:${secondsText}.${msText}`;
}
