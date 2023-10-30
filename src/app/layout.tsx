"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { NewtTestRunner, registerAnalyticsHandler } from "@/newt-pkg";
import { useEffect } from "react";
import { sendAnalytics } from "./analytics";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    // Register the analytics handler
    // This should only happen once at the top level component
    registerAnalyticsHandler(sendAnalytics);
  });

  return (
    <html lang="en">
      {/* This only needs to exist once on the top level component */}
      <body className={inter.className}>
        {children}
        <NewtTestRunner allowedEnvironments={["dev", "stg"]} />
      </body>
    </html>
  );
}
