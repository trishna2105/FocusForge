"use client"

import DashboardLayout from "@/components/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#3179F7" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to FocusForge</h2>
            <p className="text-gray-500">You have successfully logged in!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Topics Created</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Hours Focused</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-500">Streak Days</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
