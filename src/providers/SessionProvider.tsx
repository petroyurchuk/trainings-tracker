"use client";

import { SessionProvider } from "next-auth/react";

type SessionProviderProps = {
  children: React.ReactNode;
};
const SessionProviderCustom: React.FC<SessionProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default SessionProviderCustom;
