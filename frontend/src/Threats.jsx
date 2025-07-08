import { useEffect, useState } from 'react';

function Threats() {
  const [threats, setThreats] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/threats')
      .then(res => res.json())
      .then(data => {
        setThreats(data.threats);
      })
      .catch(err => console.error('Error fetching threats:', err));
  }, []);

  const filtered = threats.filter(threat =>
    threat["Threat Category"]?.toLowerCase().includes(search.toLowerCase()) ||
    threat["Geographical Location"]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛡️ Threats</h2>

      <input
        type="text"
        placeholder="Search by category or location"
        className="p-2 mb-4 w-full border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="list-disc pl-6">
        {filtered.map((threat, index) => (
          <li key={index} className="mb-2">
            <strong>{threat["Threat Category"]}</strong>, Severity: {threat["Severity Score"]} — Location: {threat["Geographical Location"]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Threats;
