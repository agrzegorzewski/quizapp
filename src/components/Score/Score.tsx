import { Badge, Stack, Title } from "@mantine/core";

import type { QuestionState } from "../Game/Game";

interface IProps {
    state: QuestionState[];
}

export default function Score({ state }: IProps) {
    return (
        <Stack>
            <Badge size="xl" mx="auto" color="green">
                Correct
            </Badge>
            <Title order={3} ta="center">
                {state.filter((s) => s === "correct").length}
            </Title>
            <Badge size="xl" mx="auto" color="red">
                Incorrect
            </Badge>
            <Title order={3} ta="center">
                {state.filter((s) => s === "incorrect").length}
            </Title>
        </Stack>
    );
}
