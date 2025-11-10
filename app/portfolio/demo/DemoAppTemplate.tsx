  "use client";

import { ReactNode } from "react";

export default function DemoAppTemplate({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-50 animate-float animation-delay-3000"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-7xl w-full text-center mb-8 border border-white/20 relative z-10 animate-fadeInUp">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl opacity-75 blur-sm -z-10"></div>
        <div className="absolute inset-0.5 bg-white rounded-2xl -z-10"></div>
        
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight">
          {title}
        </h1>
        <div className="mb-8 animate-fadeIn animation-delay-500">
          {children}
        </div>
        <p className="text-gray-500 text-xs font-medium tracking-wide opacity-70 animate-fadeIn animation-delay-1000">
          ✨ Interactive Demo • Built with Next.js & Tailwind CSS ✨
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
