import Link from "next/link";
import {
    Flex,
    Title,
    AppShell,
    AppShellMain,
    AppShellHeader,
} from "@mantine/core";

export default function LayoutAppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppShell header={{ height: "6rem" }}>
            <AppShellHeader bg="dark.8">
                <Flex h="100%" align="center">
                    <Link
                        href="/"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                        <Title ml="md" order={2}>
                            QuizApp
                        </Title>
                    </Link>
                </Flex>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
