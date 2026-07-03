import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderComponent from "@/components/providers/ThemeProviderComponent";
import NavBar from "@/components/shared/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zestaro",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviderComponent>
          <NavBar />
          <div>
            {children}
          </div>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
