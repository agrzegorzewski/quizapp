"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { Stack, Button, Select, NumberInput } from "@mantine/core";

import type {
    OpenTDBType,
    OpenTDBCategory,
    OpenTDBDifficulty,
} from "~/types/OpenTDB";

interface IFormValues {
    category: string;
    difficulty: OpenTDBDifficulty;
    numberOfQuestions: number;
    type: OpenTDBType;
}

interface IProps {
    categories: OpenTDBCategory[];
}

const formZodSchema = z.object({
    numberOfQuestions: z.number().min(1).max(50),
    category: z.string(),
    difficulty: z.union([
        z.literal("easy"),
        z.literal("medium"),
        z.literal("hard"),
    ]),
    type: z.union([
        z.literal("multiple"),
        z.literal("boolean"),
        z.literal("any"),
    ]),
}) satisfies z.ZodType<IFormValues>;

export default function StartGameForm({ categories }: IProps) {
    const router = useRouter();

    const form = useForm<IFormValues>({
        initialValues: {
            numberOfQuestions: 5,
            category: "9",
            difficulty: "medium",
            type: "any",
        },
        validate: zodResolver(formZodSchema),
    });

    // Convert categories to Mantine Select data
    const categoryData = categories.map((category) => {
        return {
            label: category.name,
            value: category.id,
        };
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                router.push(
                    `/game?${new URLSearchParams({
                        //can't use form.values directly in the URLSearchParams constructor because numberOfQuestions is a number
                        numberOfQuestions:
                            form.values.numberOfQuestions.toString(),
                        category: form.values.category,
                        difficulty: form.values.difficulty,
                        type: form.values.type,
                    }).toString()}`
                );
            }}
        >
            <Stack w="60%" p="2rem" mx="auto">
                <NumberInput
                    label="Number of questions"
                    {...form.getInputProps("numberOfQuestions")}
                    min={1}
                    max={50}
                />
                <Select
                    label="Select question category"
                    {...form.getInputProps("category")}
                    data={categoryData}
                    allowDeselect={false}
                />
                <Select
                    label="Select difficulty"
                    {...form.getInputProps("difficulty")}
                    allowDeselect={false}
                    data={[
                        { label: "Easy", value: "easy" },
                        { label: "Medium", value: "medium" },
                        { label: "Hard", value: "hard" },
                    ]}
                />
                <Select
                    label="Select question type"
                    {...form.getInputProps("type")}
                    allowDeselect={false}
                    data={[
                        { label: "Multiple choice", value: "multiple" },
                        { label: "True/False", value: "boolean" },
                        { label: "Any", value: "any" },
                    ]}
                />
                <Button type="submit" color="dark.3">
                    Start game
                </Button>
            </Stack>
        </form>
    );
}
