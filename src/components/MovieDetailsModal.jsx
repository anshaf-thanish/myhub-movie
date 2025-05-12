import React from 'react';

const MovieDetailsModal = ({ data, videoKey, onClose }) => {
  if (!data) return null;

  const title = data.title || data.name;
  const overview = data.overview;
  const release = data.release_date || data.first_air_date;
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white max-w-3xl w-full p-6 rounded-lg relative">
        <button className="absolute top-2 right-4 text-xl" onClick={onClose}>
          ✕
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={poster} alt={title} className="w-full md:w-1/3 rounded" />
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 text-sm mb-4">{release}</p>
            <p className="text-gray-800 mb-4">{overview}</p>
            {videoKey && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 rounded"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
