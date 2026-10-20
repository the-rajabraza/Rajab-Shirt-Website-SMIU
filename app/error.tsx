"use client";
import Link from "next/link";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <div className="flex flex-col items-center gap-6 max-w-lg w-full">
        <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground text-center">
          Oops! The page you're looking for is out of style.<br />
          It might have been removed, renamed, or never existed.
        </p>
        <Link href="/">
          <button className="mt-4 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
} 