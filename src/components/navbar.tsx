"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add-Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
  { label: "Admin", href: "#admin", active: false },
];

function NavbarLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-0.5 py-1 text-sm text-foreground transition-colors hover:text-cyan-600",
        active && "text-cyan-600 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-cyan-600"
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="relative mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        {/* Left links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavbarLink key={link.label} href={link.href} active={link.active}>
              {link.label}
            </NavbarLink>
          ))}
        </nav>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight text-cyan-600"
        >
          Wanderlast
        </Link>

        {/* Right links */}
        <nav className="flex items-center gap-6">
          {isPending ? null : session ? (
            <>
              <NavbarLink href="#profile">
                <span className="flex items-center gap-1.5">
                  <UserRound className="size-4" />
                  {session.user.name || session.user.email}
                </span>
              </NavbarLink>
              <button
                type="button"
                onClick={handleSignOut}
                className="relative flex cursor-pointer items-center gap-1.5 px-0.5 py-1 text-sm text-foreground transition-colors hover:text-cyan-600"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavbarLink href="/signin">Login</NavbarLink>
              <NavbarLink href="/signup">Sign Up</NavbarLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
