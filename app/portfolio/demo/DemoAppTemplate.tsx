"use client";

import { ReactNode } from "react";

export default function DemoAppTemplate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">{title}</h1>
        <div className="mb-8">
          {children}
        </div>
        <p className="text-gray-400 text-xs">Demo App Template • Customize this layout for your real app demos.</p>
      </div>
    </div>
  );
}
