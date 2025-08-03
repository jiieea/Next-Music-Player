import type { Metadata } from "next";
import { DM_Sans, Figtree, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import getSongById from "@/action/getSongsById";
import { Player } from "@/components/Player";
import getPlaylistById from "@/action/getPlaylistById";


const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"]
})

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: "--font-jakarta-sans"
})



const dmsans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ['latin']
})

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
  const userPlaylist = await getPlaylistById();
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <link rel="icon" href="/spotify.png" />
      <body
        className={`${dmsans.className} ${figtree.className} ${nunito.className}`}
      >
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs} playlist={userPlaylist}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
