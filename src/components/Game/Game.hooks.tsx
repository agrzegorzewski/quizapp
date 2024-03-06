import { IconX, IconCheck, IconQuestionMark } from "@tabler/icons-react";

import type { QuestionState } from "./Game";

export default function useGame() {
    const getIcon = (state: QuestionState) => {
        switch (state) {
            case "correct":
                return <IconCheck />;
            case "incorrect":
                return <IconX />;
            case "unanswered":
                return <IconQuestionMark />;
            default:
                return null;
        }
    };

    const getColor = (state: QuestionState) => {
        switch (state) {
            case "correct":
                return "green";
            case "incorrect":
                return "red";
            case "unanswered":
                return "blue";
        }
    };
    return [getIcon, getColor] as const;
}
