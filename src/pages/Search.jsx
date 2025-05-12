import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}`, {
        params: {
          api_key: apiKey,
          query,
          language: 'en-US',
          include_adult: false,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
    setLoading(false);
  };

  const fetchDetailsAndVideo = async (item) => {
    try {
      const [detailsRes, videosRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/${searchType}/${item.id}`, {
          params: { api_key: apiKey, language: 'en-US' },
        }),
        axios.get(`https://api.themoviedb.org/3/${searchType}/${item.id}/videos`, {
          params: { api_key: apiKey, language: 'en-US' },
        }),
      ]);

      const trailer = videosRes.data.results.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
      );

      setSelectedItem(detailsRes.data);
      setSelectedVideo(trailer?.key || null);
    } catch (error) {
      console.error('Error fetching details/video:', error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Search Movies & TV Shows</h1>

      {/* Search Input and Type Switch */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a movie or TV show..."
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {['movie', 'tv'].map((type) => (
          <label
            key={type}
            className={`cursor-pointer px-3 py-1 rounded ${
              searchType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSearchType(type)}
          >
            {type === 'movie' ? 'Movies' : 'TV Shows'}
          </label>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              isTV={searchType === 'tv'}
              onClick={() => fetchDetailsAndVideo(item)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      {/* Details Modal */}
      {selectedItem && (
        <MovieDetailsModal
          data={selectedItem}
          videoKey={selectedVideo}
          onClose={() => {
            setSelectedItem(null);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
};

export default Search;
