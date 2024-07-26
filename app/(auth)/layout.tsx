import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { validaterequest } from "@/auth";
import { redirect } from "next/navigation";

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
  const {user} = await validaterequest();
  if(user) redirect('/')
  return (
    <html lang="en">

     <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 flex flex-col w-full h-screen`}>
     <div className='w-full flex-col gap-2 h-screen flex px-3 items-center justify-center '>
    <h1 className='font-bold leading-none text-green-600 text-3xl w-full max-w-[500px] text-start'>Welcome ,
      <br/>
      Please authorize
    </h1>
    {children}
    </div>
      </body>

    </html>
  );
}
