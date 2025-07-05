"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-between px-6 py-4 sticky top-0 z-50 border-b border-indigo-100">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="ParlourPro Logo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border-2 border-pink-400 shadow"
        />
        <Link href="/">
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-700 via-pink-500 to-fuchsia-600 text-transparent bg-clip-text drop-shadow">
            ParlourPro
          </span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
        <Link
          href="/"
          className="hover:text-indigo-600 transition"
        >
          Home
        </Link>
        <Link
          href="/attendance"
          className="hover:text-pink-600 transition"
        >
          Attendance
        </Link>
        <Link
          href="/login"
          className="hover:text-indigo-600 transition"
        >
          Admin Login
        </Link>
        <Link
          href="/user-login"
          className="hover:text-pink-600 transition"
        >
          Employee Login
        </Link>
        <Link
          href="/dashboard"
          className="hover:text-indigo-600 transition"
        >
          Dashboard
        </Link>
      </div>
      <button
        className="md:hidden p-2 rounded hover:bg-indigo-50"
        onClick={() => setOpen(!open)}
      >
        <Menu className="w-7 h-7 text-indigo-700" />
      </button>
      {open && (
        <div className="absolute top-16 right-4 bg-white rounded-xl shadow-lg border p-6 flex flex-col gap-4 text-lg font-medium md:hidden animate-fade-in z-50">
          <Link
            href="/"
            className="hover:text-indigo-600 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/attendance"
            className="hover:text-pink-600 transition"
            onClick={() => setOpen(false)}
          >
            Attendance
          </Link>
          <Link
            href="/login"
            className="hover:text-indigo-600 transition"
            onClick={() => setOpen(false)}
          >
            Admin Login
          </Link>
          <Link
            href="/user-login"
            className="hover:text-pink-600 transition"
            onClick={() => setOpen(false)}
          >
            Employee Login
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-indigo-600 transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
