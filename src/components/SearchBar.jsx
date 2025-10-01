import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar filmes..."
          className="w-full px-6 py-4 bg-gray-800 text-white rounded-full border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-colors duration-200"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200"
            >
              Limpar
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            🔍 Buscar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
