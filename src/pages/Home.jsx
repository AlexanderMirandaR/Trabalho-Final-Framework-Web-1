import { useState, useEffect } from "react";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import GenreFilter from "../components/GenreFilter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, selectedGenre]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;

      if (searchQuery) {
        data = await searchMovies(searchQuery, currentPage);
      } else if (selectedGenre) {
        data = await getMoviesByGenre(selectedGenre, currentPage);
      } else {
        data = await getPopularMovies(currentPage);
      }

      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // API limita a 500 páginas
    } catch (err) {
      setError("Erro ao carregar filmes. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedGenre(null);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : selectedGenre
              ? "Filmes por Gênero"
              : "Filmes Populares"}
          </h2>
          <p className="text-gray-400">
            Descubra os melhores filmes e séries do momento
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {!searchQuery && (
          <GenreFilter
            onGenreChange={handleGenreChange}
            selectedGenre={selectedGenre}
          />
        )}

        {movies.length === 0 ? (
          <div className="text-center text-white text-xl py-20">
            Nenhum filme encontrado.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
