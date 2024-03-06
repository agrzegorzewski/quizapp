import Link from "next/link";
import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

import type { OpenTDBTriviaResponse } from "~/types/OpenTDB";

import Game from "~/components/Game/Game";
import { decodeQuestion } from "~/utils/OpenTDB";

export default async function GamePage({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const { numberOfQuestions, category, difficulty, type } = searchParams;

    if (!(numberOfQuestions && category && difficulty && type)) {
        return (
            <Alert color="red" icon={<IconAlertTriangle />}>
                Invalid parameters received, return to home by clicking{" "}
                <Link href="/">HERE</Link>
            </Alert>
        );
    }

    const triviaRequestParams = new URLSearchParams({
        amount: numberOfQuestions,
        category,
        difficulty,
        ...(type !== "any" ? { type } : {}),
        encode: "url3986",
    }).toString();

    const triviaResponse = await fetch(
        `https://opentdb.com/api.php?${triviaRequestParams}`,
        { cache: "no-store" }
    );
    const triviaData = (await triviaResponse.json()) as OpenTDBTriviaResponse;

    switch (triviaData.response_code) {
        case 0:
            break;
        case 1:
            return (
                <Alert color="red" icon={<IconAlertTriangle />}>
                    <p>
                        No results found for the specified parameters. Reducing
                        the number of questions usually fixes the issue.
                    </p>
                </Alert>
            );
        case 2:
            return (
                <Alert color="red" icon={<IconAlertTriangle />}>
                    <p>
                        Invalid parameters. Please return to the home page and
                        select game options again
                    </p>
                </Alert>
            );
        case 5:
            return (
                <Alert color="red" icon={<IconAlertTriangle />}>
                    <p>
                        Too many requests. Please wait 5 seconds and try again.
                    </p>
                </Alert>
            );
    }

    const decodedQuestions = triviaData.results.map(decodeQuestion);

    return <Game questions={decodedQuestions}></Game>;
}
