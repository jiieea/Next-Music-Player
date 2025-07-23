import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import getSongById from "@/action/getSongsById";
import { Player } from "@/components/Player";


const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone built with Next.js and Tailwind CSS",
  icons: {
    icon: 'spotify.png'
  }
};

export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongById();
  return (
    <html lang="en">
      <link rel="icon" href="/spotify.png" />
      <body
        className={`${figtree.variable} antialiased`}
      >
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={ userSongs }>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
