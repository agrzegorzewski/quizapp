import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { JetBrains_Mono } from "next/font/google";

import Providers from "~/components/Providers/Providers";
import LayoutAppShell from "~/components/AppShell/AppShell";

//TODO: actually pass this font to mantine xD
const font = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Quizapp",
    description: "Created by agrzegorzewski",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`font-sans ${font.variable}`}>
                <Providers>
                    <LayoutAppShell>{children}</LayoutAppShell>
                </Providers>
            </body>
        </html>
    );
}
