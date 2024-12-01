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

const title = "Dania cumpleaños 32 🎉";
const description = "🎂";
const url = "https://www.dania-birthday.site";

export const metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    images: [
      {
        url: '/thumbnail.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    url: url,
    title: title,
    description: description,
    image: '/thumbnail.jpg',
  },
  metadataBase: url,
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
