"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return <Link href="/login">Login</Link>;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {session.user?.name}</span>
      <button
        onClick={() => signOut()}
        className="text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
