import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/threats">Threats</Link>
    </nav>
  );
}

export default Navbar;
