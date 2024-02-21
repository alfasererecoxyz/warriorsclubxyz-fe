import Link from "next/link";
import { Siwe } from "../siwe/Siwe";
import { ThemeToggle } from "./ThemeToggle";
import { WarriorsClubLogo } from "./branding/WarriorsClubLogo";

export function Header() {
  return (
    <header className="flex flex-row justify-between p-4">
      <Link href="/">
        <WarriorsClubLogo/>
      </Link>
    </header>
  )
}