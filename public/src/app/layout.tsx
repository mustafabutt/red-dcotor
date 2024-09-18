import React, { useEffect, useState } from 'react'
import type { Metadata } from "next";
import Header from "@/_components/UI/Header"
import Footer from "@/_components/UI/Footer"
import { NextAuthProvider } from './context/SessionProvider';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout({
  children,
  appointment,
  location,
  doctor
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {

  return (
    <>
        <NextAuthProvider >
          <ThemeProvider>
              <Header />
                {children}
                {/* {appointment}
                {location}
                {doctor} */}
              <Footer />
          </ThemeProvider>
        </NextAuthProvider>
    </>
  );
}
