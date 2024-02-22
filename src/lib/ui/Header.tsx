import Link from "next/link";
import { Siwe } from "../siwe/Siwe";
import { ThemeToggle } from "./ThemeToggle";
import { WarriorsClubLogo } from "./branding/WarriorsClubLogo";
import { cx } from "class-variance-authority";

export function Header() {
  return (
    <header className="flex flex-row items-center gap-8 p-4">
      <Link href="/">
        <WarriorsClubLogo/>
      </Link>
      <Link href="/blog">
        <span className={cx('px-2 py-1 underline uppercase')}>
          Blog
        </span>
      </Link>
    </header>
  )
}