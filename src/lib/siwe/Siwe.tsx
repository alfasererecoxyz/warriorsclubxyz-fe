'use client';
import React from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";
import { Button } from "../ui/Button";
import { BorderDecal } from "../ui/BorderDecal";
import { DisplayAddress } from "../ui/DisplayAddress";
import { ClassProp } from "class-variance-authority/types";
import { cx } from "class-variance-authority";

export function Siwe({className}: {className?: string}) {
  const { signMessageAsync } = useSignMessage()
  const { address, isConnected } = useAccount()
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    try {
      const callbackUrl = "/"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in to warriorsclub.xyz.",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: await getCsrfToken() 
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (session) {
    return (
      <div className="flex justify-center items-center bg-white text-black px-2 py-1">
        <DisplayAddress address={session.user?.name}/>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Button onClick={() => handleLogin()} size={'lg'} className={cx(undefined, className)}>
        <div className="flex justify-center items-center dark:bg-white bg-white text-black px-2 py-1">
          Sign-in
        </div>
      </Button>
    </div>
  )
}