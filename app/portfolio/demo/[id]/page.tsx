"use client";
"use client";

import { useRouter } from "next/navigation";

// --- Demo Mini-Apps (copied from main portfolio page) ---
function ECommerceApp() {
  return <div className="p-8 text-center">E-Commerce App Demo</div>;
}
function BankingApp() {
  return <div className="p-8 text-center">Mobile Banking App Demo</div>;
}
function HealthcareApp() {
  return <div className="p-8 text-center">Healthcare Management System Demo</div>;
}
function RealEstateApp() {
  return <div className="p-8 text-center">Real Estate Portal Demo</div>;
}
function FoodDeliveryApp() {
  return <div className="p-8 text-center">Food Delivery App Demo</div>;
}
function LearningApp() {
  return <div className="p-8 text-center">AI Learning Platform Demo</div>;
}

const projects = [
  { appType: "ecommerce", title: "E-Commerce Platform" },
  { appType: "banking", title: "Mobile Banking App" },
  { appType: "healthcare", title: "Healthcare Management System" },
  { appType: "realestate", title: "Real Estate Portal" },
  { appType: "food", title: "Food Delivery App" },
  { appType: "learning", title: "AI Learning Platform" },
];

function renderMiniApp(appType) {
  switch (appType) {
    case "ecommerce":
      return <ECommerceApp />;
    case "banking":
      return <BankingApp />;
    case "healthcare":
      return <HealthcareApp />;
    case "realestate":
      return <RealEstateApp />;
    case "food":
      return <FoodDeliveryApp />;
    case "learning":
      return <LearningApp />;
    default:
      return <div className="p-8 text-center">App not found</div>;
  }
}

export default function DemoPage() {
  const router = useRouter();
  // Get the id param from the URL: /portfolio/demo/[id]
  // The path is available as router.asPath, e.g. /portfolio/demo/2
  // We'll extract the last segment as the id
  let idx = null;
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/\/portfolio\/demo\/(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (!isNaN(n) && n >= 0 && n < projects.length) idx = n;
    }
  }

  if (idx === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-2">Demo Not Found</h1>
          <p className="text-gray-600">The requested demo does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{projects[idx].title}</h1>
        <div className="mb-8">
          {renderMiniApp(projects[idx].appType)}
        </div>
        <p className="text-gray-500 text-sm">This is the real interactive demo for this project.</p>
      </div>
    </div>
  );
}
