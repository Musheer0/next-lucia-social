import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import SessionProvider from "./SessionProvider";
import { validaterequest } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import {ThemeProvider}from 'next-themes'
import MenuBar from "./MenuBar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvide from "../ReactQueryProvide";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title :{
    template: '%s | next-social',
    default: 'next-social'
  },
  description: "peacefull social media app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validaterequest();
  if(!session.user) redirect('/sign-in')
  return (
    <html lang="en">
     <SessionProvider data={session}>
     <body className={`${geistSans.variable} ${geistMono.variable} bg-background flex flex-col w-full h-screen`}>
      <ReactQueryProvide>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar/>
       <main className="w-full flex-1 max-h-screen sm:flex items-start gap-2 py-2 overflow-auto bg-inherit px-2">
        <MenuBar className=" sticky top-0 justify-between hidden sm:flex  flex-col  rounded-xl  "/>
    
       {children}
    
       <Toaster/>
       <MenuBar className=" sticky justify-between w-full rounded-xl sm:hidden bottom-2  flex "/>

       </main>
      </ThemeProvider>
      </ReactQueryProvide>
      </body>
     </SessionProvider>
    </html>
  );
}
