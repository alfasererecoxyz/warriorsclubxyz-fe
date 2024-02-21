'use client';

import { avalanche, avalancheFuji } from "viem/chains";
import { ChildrenProps } from "../common/ChildrenProps";
import { WagmiProvider as Provider, createConfig, http } from "wagmi";

const config = createConfig({
  chains: [avalanche, avalancheFuji],
  transports: {
    [avalanche.id]: http(),
    [avalancheFuji.id]: http()
  }
})

export function WagmiProvider({ children }: ChildrenProps) {
  return (
    <Provider config={config}>
      {children}
    </Provider>
  )
}