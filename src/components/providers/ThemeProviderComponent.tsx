'use client'
import { ThemeProvider } from "next-themes";
import type React from "react";

const ThemeProviderComponent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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