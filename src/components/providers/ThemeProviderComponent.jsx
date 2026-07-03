'use client'
import { ThemeProvider } from "next-themes";

const ThemeProviderComponent = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderComponent;