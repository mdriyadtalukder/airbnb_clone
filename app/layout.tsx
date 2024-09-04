import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modals from "./components/modals/Modals";
import RegisterModal from "./components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ClientOnly from "./components/ClientOnly";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <Toaster></Toaster>
          <SearchModal></SearchModal>
          <RentModal></RentModal>
          <LoginModal></LoginModal>
          <RegisterModal></RegisterModal>
          <Navbar currentUser={currentUser}></Navbar>
        </ClientOnly>
        <div className="pt-28 pb-20">
          {children}

        </div>
      </body>
    </html>
  );
}
