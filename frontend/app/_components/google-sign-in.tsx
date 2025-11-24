"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"

const GoogleSignIn = () => {
  useEffect(() => {
    signIn("google")
  }, [])

  return null
}

export default GoogleSignIn
