import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: { api_key: apiKey, language: 'en-US' },
          }
        );

        const genreMap = {};
        response.data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });

        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [apiKey]);

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/tv',
          {
            params: {
              api_key: apiKey,
              page,
              sort_by: 'popularity.desc',
              language: 'en-US',
              include_adult: false,
            },
          }
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log('Discovered movies on page', page, response.data.results);
      } catch (error) {
        console.error('Error fetching discover movies:', error);
      }
    };

    fetchDiscoverMovies();
  }, [apiKey, page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Discover Movies</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
      <div className="mt-8 flex justify-center">
        <PaginationControls
          page={page}
          totalPages={Math.min(totalPages, 20)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Movies;
