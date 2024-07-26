"use client"
import { Session, User } from 'lucia'
import React, { createContext, useContext } from 'react'

interface SessionContext{
user: User,
session:Session
}

const SessionContext = createContext<SessionContext | null>(null)
const SessionProvider = ({children, data}:React.PropsWithChildren<{data:SessionContext}>) => {
  return (
    <>
    <SessionContext.Provider value={data}>
        {children}
    </SessionContext.Provider>
    </>
  )
}
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
export default SessionProvider