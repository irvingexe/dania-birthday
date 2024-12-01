import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const titanOne = localFont({
  src: "./fonts/TitanOne-Regular.ttf",
  variable: "--titan-one",
  weight: "100 900",
});
const corinthia = localFont({
  src: "./fonts/Corinthia-Regular.ttf",
  variable: "--corinthia",
  weight: "100 900",
});
const crimson = localFont({
  src: "./fonts/CrimsonText-Regular.ttf",
  variable: "--crimson",
  weight: "100 900",
});

export const metadata = {
  title: "Dania cumpleaños 32 🎉",
  description: "🎂",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${crimson.variable} ${geistMono.variable} ${titanOne.variable} ${corinthia.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
