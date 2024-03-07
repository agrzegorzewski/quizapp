"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IconQuestionMark } from "@tabler/icons-react";
import { Text, Stack, Modal, Button, Stepper } from "@mantine/core";
import {
    useCounter,
    useInterval,
    useListState,
    useDisclosure,
} from "@mantine/hooks";

import type { OpenTDBDecodedQuestion } from "~/types/OpenTDB";

import Score from "../Score/Score";
import useGame from "./Game.hooks";
import Timer from "../Timer/Timer";
import Question from "../Question/Question";

interface IGameProps {
    questions: OpenTDBDecodedQuestion[];
}

export type QuestionState = "correct" | "incorrect" | "unanswered";

export default function Game({ questions }: IGameProps) {
    //game state
    const [gameState, gameStateHandlers] = useListState<QuestionState>(
        Array.from({ length: questions.length }, () => "unanswered")
    );

    //state for the modal
    const [modalOpened, { open: modalOpen, close: modalClose }] =
        useDisclosure(false);
    const [modalScoreTime, setModalScoreTime] = useState(0);

    //state for the active stepper panel
    const [active, activeHandlers] = useCounter(0, {
        min: 0,
        max: questions.length - 1,
    });

    //state for the timer, i hate lifting state
    // it's not accurate even in the slightest
    // TODO: fix
    const [miliseconds, setMiliseconds] = useState(0);
    const timerInterval = useInterval(() => {
        setMiliseconds((ms) => ms + 100);
    }, 100);

    const [getIcon, getColor] = useGame();

    const setAnswer = (id: number, answer: QuestionState) => {
        gameStateHandlers.setItem(id, answer);
    };

    useEffect(() => {
        timerInterval.start();
        return timerInterval.stop;
    });

    return (
        <>
            <Modal
                opened={modalOpened}
                onClose={modalClose}
                title={
                    <Text fw="700">
                        {"Congratulations, let's see how you did!"}
                    </Text>
                }
            >
                <Stack>
                    <Score state={gameState} miliseconds={modalScoreTime} />
                    <Button
                        href="/"
                        mx="auto"
                        size="lg"
                        px="1rem"
                        py="0.5rem"
                        color="cyan"
                        component={Link}
                    >
                        Return to home
                    </Button>
                </Stack>
            </Modal>

            <Stack
                mx="auto"
                w={{
                    base: "90%",
                    sm: "60%",
                }}
            >
                <Timer miliseconds={miliseconds} />
                <Stepper
                    pt="1rem"
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
                        base: "100%",
                        sm: "50%",
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
                        base: "100%",
                        sm: "50%",
                    }}
                >
                    Previous question
                </Button>
                <Button
                    mx="auto"
                    color="dark.3"
                    disabled={gameState.some((s) => s === "unanswered")}
                    w={{
                        base: "100%",
                        sm: "50%",
                    }}
                    onClick={() => {
                        timerInterval.stop();
                        setModalScoreTime(miliseconds);
                        modalOpen();
                    }}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
}
