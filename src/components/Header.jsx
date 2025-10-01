import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎬</span>
            <h1 className="text-2xl font-bold text-white">MovieApp</h1>
          </Link>
          <nav>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Início
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
