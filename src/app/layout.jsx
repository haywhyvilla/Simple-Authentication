import "./globals.css";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Authentication",
  description:
    "Connecting students with the perfect Tutor: D-lighter Tutor unlocks academic and skill development excellence through personalized tutoring",
  icons: [
    {
      rel: "icon",
      url: "favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
