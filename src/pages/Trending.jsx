import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
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
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          {
            params: { api_key: apiKey },
          }
        );
        setMovies(response.data.results);
        console.log('Trending movies:', response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, [apiKey]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Trending Movies Today</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No trending movies found.</p>
      )}
    </div>
  );
};

export default Trending;
