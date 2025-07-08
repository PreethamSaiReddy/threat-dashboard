import React, { useEffect, useState } from 'react';
import { fetchThreats, fetchStats } from './api';

function App() {
  const [threats, setThreats] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const threatsRes = await fetchThreats();
        const statsRes = await fetchStats();

        setThreats(threatsRes.data.threats);
        setStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cyber Threat Dashboard</h1>

      <h2 className="text-xl font-semibold">Threats</h2>
      <ul className="mb-6">
        {threats.map((threat) => (
          <li key={threat._id} className="border-b py-2">
            <strong>{threat['Threat Category']}</strong>: {threat['Cleaned Threat Description']} 
            <span className="ml-2 text-sm text-gray-500">[Severity: {threat['Severity Score']}]</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Stats</h2>
      <p>Total Threats: {stats.total}</p>
    </div>
  );
}

export default App;
