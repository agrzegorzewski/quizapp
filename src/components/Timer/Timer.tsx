"use client";

import { Title } from "@mantine/core";

import { formatTime } from "~/utils/OpenTDB";

interface IProps {
    miliseconds: number;
}

export default function Timer({ miliseconds }: IProps) {
    return (
        <Title order={2} mx="auto" pt="1rem">
            {formatTime(miliseconds)}
        </Title>
    );
}
