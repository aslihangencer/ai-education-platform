"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Mock data - replace with real data later
const gradeData = [
  { month: "Jan", grade: 75 },
  { month: "Feb", grade: 80 },
  { month: "Mar", grade: 85 },
  { month: "Apr", grade: 82 },
  { month: "May", grade: 88 },
];

const courseData = [
  { name: "Math", students: 45 },
  { name: "Physics", students: 32 },
  { name: "Chemistry", students: 28 },
  { name: "Biology", students: 35 },
];

const performanceData = [
  { name: "Good", value: 60 },
  { name: "Average", value: 30 },
  { name: "At Risk", value: 10 },
];

const initialNotifications = [
  "New assignment posted in Math",
  "Grade updated for Physics quiz",
  "Upcoming lesson: Chemistry Lab",
  "Message from teacher: Great work!",
  "New course recommendation: Advanced Calculus",
];

export default function Dashboard() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [stats, setStats] = useState({
    totalStudents: 120,
    activeCourses: 8,
    avgGrade: 82,
    performance: "Good",
  });

  // Real-time feel - update notifications every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        "Grade submitted for Biology test",
        "New message from instructor",
        "Assignment deadline approaching",
        "Course completion milestone reached",
        "Peer collaboration opportunity",
        ...notifications.slice(0, 4),
      ];
      setNotifications(newNotifications);

      // Simulate stat updates
      setStats(prev => ({
        ...prev,
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 3) - 1,
        avgGrade: Math.max(70, Math.min(95, prev.avgGrade + Math.floor(Math.random() * 5) - 2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h2 className="text-2xl font-bold">{stats.totalStudents}</h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <h2 className="text-2xl font-bold">{stats.activeCourses}</h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Avg Grade</p>
              <h2 className="text-2xl font-bold">{stats.avgGrade}%</h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Performance</p>
              <h2 className={`text-2xl font-bold ${
                stats.performance === 'Good' ? 'text-green-500' :
                stats.performance === 'Average' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {stats.performance}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="p-4">
          <h3 className="mb-4 font-semibold">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="grade"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-4 font-semibold">Course Popularity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-4 font-semibold">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={performanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">AI Course Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-medium text-blue-900">Advanced Mathematics</h4>
              <p className="text-sm text-blue-700 mt-1">Based on your physics performance</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <h4 className="font-medium text-green-900">Data Structures</h4>
              <p className="text-sm text-green-700 mt-1">Recommended for computer science path</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
              <h4 className="font-medium text-purple-900">Organic Chemistry</h4>
              <p className="text-sm text-purple-700 mt-1">Complements your biology studies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Notifications */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Live Updates</h3>
          <div className="space-y-3">
            {notifications.slice(0, 6).map((notification, i) => (
              <div key={i} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{notification}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}