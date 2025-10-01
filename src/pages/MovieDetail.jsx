import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(
        "Erro ao carregar detalhes do filme. Tente novamente mais tarde."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Filme não encontrado." />;

  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 1)), url(${getImageUrl(
            movie.backdrop_path,
            "original"
          )})`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 px-6 py-3 bg-gray-800 bg-opacity-80 text-white rounded-lg hover:bg-opacity-100 transition-all duration-200 font-semibold"
          >
            ← Voltar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full md:w-80 rounded-lg shadow-2xl"
            />
          </div>

          {/* Informações */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-xl text-gray-400 italic mb-6">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
              <span className="text-gray-400">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
              <span className="text-gray-400">{movie.runtime} min</span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Gêneros:</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Sinopse:</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>

            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Elenco Principal:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <img
                        src={getImageUrl(actor.profile_path, "w185")}
                        alt={actor.name}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <p className="font-semibold text-sm">{actor.name}</p>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trailer && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Trailer:</h3>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800 p-6 rounded-lg">
              <div>
                <p className="text-gray-400 text-sm">Orçamento</p>
                <p className="font-semibold">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Receita</p>
                <p className="font-semibold">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="font-semibold">{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
