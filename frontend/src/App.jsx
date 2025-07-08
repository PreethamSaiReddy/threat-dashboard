import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Threats from './Threats';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/threats" element={<Threats />} />
        <Route path="/" element={<Dashboard />} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
