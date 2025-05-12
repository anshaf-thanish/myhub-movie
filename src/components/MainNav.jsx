// MainNav.jsx
import React, { useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom';

export default function MainNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="fixed bottom-0 left-0 w-full border-t text-white border-white-300 bg-gray-900 z-100"
      style={{color:"white", background:"gray"}}
    >
      <BottomNavigationAction  label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction  label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction  label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction  label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
