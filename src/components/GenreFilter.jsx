import { useState, useEffect } from "react";
import { getGenres } from "../services/api";

const GenreFilter = ({ onGenreChange, selectedGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-white text-lg font-semibold mb-4">
        Filtrar por Gênero:
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            selectedGenre === null
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedGenre === genre.id
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
