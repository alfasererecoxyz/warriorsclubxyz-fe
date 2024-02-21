import './globals.css';
import { Quantico } from "next/font/google";
import { ChildrenProps } from "@/lib/common/ChildrenProps";
import { TanstackReactQueryProvider } from "@/lib/tanstack-react-query/TanstackReactQueryProvider";
import { WagmiProvider } from "@/lib/wagmi/WagmiProvider";
import { SessionProvider } from "next-auth/react";
import { cx } from 'class-variance-authority';

const quantico = Quantico({ subsets: ["latin"], weight: ["400", "700"] });


export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body
        className={cx("bg-white dark:bg-black text-black dark:text-white", quantico.className)}
      >
        <SessionProvider>
          <WagmiProvider>
            <TanstackReactQueryProvider>
              {children}
            </TanstackReactQueryProvider>
          </WagmiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
