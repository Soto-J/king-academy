import React from "react";
import Image from "next/image";

import { Users, CircleDot, Crown } from "lucide-react";

export const AuthBrandPannel = () => {
  return (
    <div className="from-primary via-primary/90 to-primary/80 relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br text-white md:flex">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] opacity-30" />
      <div className="bg-brand-red/10 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 p-8 text-center md:space-y-8 md:p-12">
        <div className="space-y-4">
          <Image
            src="/logo.jpg"
            alt="King Baseball Academy"
            width={120}
            height={120}
            priority
            className="mx-auto rounded-2xl shadow-2xl ring-4 ring-white/20"
          />
          <h2 className="text-3xl font-bold tracking-tight">
            King Baseball Academy
          </h2>
          <p className="max-w-md text-xl text-blue-100">
            Elite Baseball Training & League Management
          </p>
        </div>

        <div className="grid max-w-sm grid-cols-1 gap-6 text-left">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Team Management</h3>
              <p className="text-sm text-blue-100">
                Manage players, coaches, and teams
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <CircleDot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Game Tracking</h3>
              <p className="text-sm text-blue-100">
                Track scores, stats, and schedules
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Elite Training</h3>
              <p className="text-sm text-blue-100">
                Professional development programs
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-blue-100">
            "Building Champions On and Off the Field"
          </p>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <CircleDot
                key={i}
                className="text-brand-red h-3 w-3 opacity-60"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
