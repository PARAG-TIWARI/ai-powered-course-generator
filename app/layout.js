import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { icons } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CourseHub - AI Course Generator",
  description:
    "Create personalized AI-generated coding courses with video integration. Learn at your own pace with AI-powered course generation.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <GoogleOneTap/> */}
        <body className={`${inter.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
