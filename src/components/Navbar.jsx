import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-4">
        <Link to="/" className="hover:underline" aria-label="Home">Home</Link>
        <Link to="/favorites" className="hover:underline" aria-label="Favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;