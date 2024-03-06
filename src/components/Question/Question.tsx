"use client";
import { Stack, Title, Badge, Group, Button } from "@mantine/core";

import type { OpenTDBDecodedQuestion } from "~/types/OpenTDB";

interface IProps {
    answered: boolean;
    id: number;
    question: OpenTDBDecodedQuestion;
    setAnswer: (id: number, answer: "correct" | "incorrect") => void;
}

export default function Question({
    question,
    setAnswer,
    answered,
    id,
}: IProps) {
    const {
        category,
        difficulty,
        type,
        question: questionText,
        answers,
        correctAnswer,
    } = question;

    const difficultyColors = {
        easy: "green",
        medium: "orange",
        hard: "red",
    };

    const answerColors = {
        correct: "green",
        incorrect: "red",
    };

    const handleSelectAnswer = (answer: string) => {
        if (answered) return;
        if (answer === correctAnswer) {
            setAnswer(id, "correct");
        } else {
            setAnswer(id, "incorrect");
        }
    };

    return (
        <Stack p="2rem">
            <Stack>
                <Title w="100%" order={1} ta="center">
                    {questionText}
                </Title>
                <Group mx="auto">
                    <Badge size="lg" color="blue">
                        {category}
                    </Badge>
                    <Badge size="lg" color="purple">
                        {type}
                    </Badge>
                    <Badge
                        mx="auto"
                        size="lg"
                        color={difficultyColors[difficulty]}
                    >
                        {difficulty}
                    </Badge>
                </Group>
            </Stack>
            <Stack mt="1rem">
                {answers.map((answer, index) => (
                    <Button
                        mx="auto"
                        key={index}
                        onClick={() => handleSelectAnswer(answer)}
                        w={{
                            base: "50%",
                            sm: "100%",
                        }}
                        //this could be better
                        color={
                            !answered
                                ? "gray"
                                : answer === correctAnswer
                                  ? answerColors.correct
                                  : answerColors.incorrect
                        }
                    >
                        {answer}
                    </Button>
                ))}
            </Stack>
        </Stack>
    );
}
