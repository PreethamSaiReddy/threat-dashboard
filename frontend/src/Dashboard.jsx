import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({ by_category: [], by_severity: [], total: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/threats/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">Threats by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats.by_category}>
          <XAxis dataKey="_id" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Count" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="text-lg font-semibold mt-6 mb-2">Threats by Severity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats.by_severity}>
          <XAxis dataKey="_id" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
