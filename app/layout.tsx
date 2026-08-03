import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asdecided.com"),
  title: {
    default: "AsDecided — Engineering decisions your agents can follow",
    template: "%s · AsDecided",
  },
  description:
    "A local, deterministic system of record for the product decisions behind your code.",
  alternates: { canonical: "https://asdecided.com/" },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    url: "https://asdecided.com/",
    title: "AsDecided",
    description: "Engineering decisions your agents can follow. Build, as decided.",
    type: "website",
    siteName: "AsDecided",
  },
  twitter: {
    card: "summary_large_image",
    title: "AsDecided",
    description: "Engineering decisions your agents can follow. Build, as decided.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
