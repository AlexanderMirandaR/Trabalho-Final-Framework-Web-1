import { Link } from "react-router-dom";
import { getImageUrl } from "../services/api";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
