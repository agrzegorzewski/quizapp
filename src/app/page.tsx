import { Text, Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

import type { OpenTDBCategoryResponse } from "~/types/OpenTDB";

import { OpenTDBCategoryResponseValidator } from "~/types/OpenTDB";
import StartGameForm from "~/components/_forms/StartGameForm/StartGameForm";

export default async function HomePage() {
    // i don't like this being in a try/catch
    try {
        const categoriesResponse = await fetch(
            "https://opentdb.com/api_category.php"
        );
        const categoriesData =
            (await categoriesResponse.json()) as OpenTDBCategoryResponse;
        const categories =
            OpenTDBCategoryResponseValidator.parse(
                categoriesData
            ).trivia_categories;

        return <StartGameForm categories={categories} />;
    } catch (error) {
        return (
            <Alert color="red" icon={<IconAlertTriangle />}>
                <Text>
                    There was an error fetching categories. Please make sure you
                    have a stable internet connection and refresh the page.
                </Text>
            </Alert>
        );
    }
}
