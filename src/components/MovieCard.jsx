const MovieCard = ({ movie, genres = {}, isTV = false, onClick }) => {
  const title = isTV ? movie.name : movie.title;
  const releaseDate = isTV ? movie.first_air_date : movie.release_date;
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const genreNames = movie.genre_ids?.map((id) => genres[id]).filter(Boolean);

  return (
    <div
      className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer mt-5"
      onClick={() => onClick(movie)}
    >
      <img src={posterPath} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{releaseDate}</p>
        {genreNames?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-white">
            {genreNames.map((name, index) => (
              <span key={index} className="bg-blue-500 px-2 py-0.5 rounded-full">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
