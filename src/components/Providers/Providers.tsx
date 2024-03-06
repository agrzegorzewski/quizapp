import { MantineProvider } from "@mantine/core";

import theme from "./MantineTheme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            {children}
        </MantineProvider>
    );
}
