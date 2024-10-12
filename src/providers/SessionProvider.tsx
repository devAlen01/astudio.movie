"use client";
import { ReactNode } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
};

export default SessionProvider;
