import { useAtomValue } from "jotai";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ModuleGrid } from "../components/dashboard/ModuleGrid";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { userAtom } from "../store/Store";

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back, {user.name}
          </h1>
          <p className="text-lg text-gray-600">
            Choose a module to begin your diagnostic workflow
          </p>
        </div>

        {/* Module Cards */}
        <div className="mb-12">
          <ModuleGrid />
        </div>

        {/* Recent Activity */}
        <div className="max-w-2xl">
          <RecentActivity />
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none -z-0" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none -z-0" />
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none -z-0" />
    </div>
  );
}
