import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Demo data (should match your main portfolio projects)
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with advanced features including inventory management, payment processing, and analytics dashboard.",
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and financial insights.",
  },
  {
    title: "Healthcare Management System",
    description: "Comprehensive healthcare platform for patient management, appointment scheduling, and medical records.",
  },
  {
    title: "Real Estate Portal",
    description: "Property listing platform with advanced search filters, virtual tours, and integrated mortgage calculator.",
  },
  {
    title: "Food Delivery App",
    description: "On-demand food delivery application with real-time tracking, multiple payment options, and rating system.",
  },
  {
    title: "AI Learning Platform",
    description: "An interactive AI-powered learning platform featuring adaptive quizzes, real-time feedback, and personalized course recommendations.",
  },
];

export default function DemoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id !== undefined && !Array.isArray(id)) {
      const idx = parseInt(id, 10);
      if (!isNaN(idx) && idx >= 0 && idx < projects.length) {
        setProject(projects[idx]);
      }
    }
  }, [id]);

  if (!project) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{project.title}</h1>
        <p className="text-gray-700 mb-8">{project.description}</p>
        <div className="text-6xl mb-4">🚀</div>
        <p className="text-gray-500">This is a placeholder for the interactive demo. You can customize this page to show a real app preview or more details.</p>
      </div>
    </div>
  );
}
