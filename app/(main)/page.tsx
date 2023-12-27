"use client";

import { useAuth } from "@clerk/nextjs";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h2>Welcome</h2>
    </div>
  );
}
