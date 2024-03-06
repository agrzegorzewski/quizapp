"use client";

import { IconQuestionMark } from "@tabler/icons-react";
import { Stack, Modal, Button, Stepper } from "@mantine/core";
import { useCounter, useListState, useDisclosure } from "@mantine/hooks";

import type { OpenTDBDecodedQuestion } from "~/types/OpenTDB";

import Score from "../Score/Score";
import useGame from "./Game.hooks";
import Question from "../Question/Question";

interface IGameProps {
    questions: OpenTDBDecodedQuestion[];
}

export type QuestionState = "correct" | "incorrect" | "unanswered";

export default function Game({ questions }: IGameProps) {
    const [gameState, gameStateHandlers] = useListState<QuestionState>(
        Array.from({ length: questions.length }, () => "unanswered")
    );

    const [modalOpened, { open: modalOpen, close: modalClose }] =
        useDisclosure(false);

    const [active, activeHandlers] = useCounter(0, {
        min: 0,
        max: questions.length - 1,
    });

    const setAnswer = (id: number, answer: QuestionState) => {
        gameStateHandlers.setItem(id, answer);
    };

    const [getIcon, getColor] = useGame();

    return (
        <>
            <Modal opened={modalOpened} onClose={modalClose}>
                <Score state={gameState} />
            </Modal>

            <Stack
                mx="auto"
                w={{
                    base: "90%",
                    sm: "60%",
                }}
            >
                <Stepper
                    pt="2rem"
                    size="sm"
                    active={active}
                    icon={<IconQuestionMark />}
                    onStepClick={activeHandlers.set}
                >
                    {questions.map((question, index) => (
                        <Stepper.Step
                            key={index}
                            label={`#${index + 1}`}
                            icon={getIcon(gameState[index]!)} //dont like the null assertion
                            color={getColor(gameState[index]!)} //dont like the null assertion
                            completedIcon={getIcon(gameState[index]!)} //dont like the null assertion
                        >
                            <Question
                                id={index}
                                key={index}
                                question={question}
                                setAnswer={setAnswer}
                                answered={gameState[index] !== "unanswered"}
                            />
                        </Stepper.Step>
                    ))}
                </Stepper>
                <Button
                    mx="auto"
                    color="lime"
                    onClick={activeHandlers.increment}
                    disabled={active === questions.length - 1}
                    w={{
                        base: "50%",
                        sm: "100%",
                    }}
                >
                    Next question
                </Button>
                <Button
                    mx="auto"
                    color="grape"
                    disabled={active === 0}
                    onClick={activeHandlers.decrement}
                    w={{
                        base: "50%",
                        sm: "100%",
                    }}
                >
                    Previous question
                </Button>
                <Button
                    mx="auto"
                    color="dark.3"
                    disabled={gameState.some((s) => s === "unanswered")}
                    onClick={() => {
                        modalOpen();
                    }}
                    w={{
                        base: "50%",
                        sm: "100%",
                    }}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
}
