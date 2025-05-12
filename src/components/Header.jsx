import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Header = () => {
    const [isSticky, setSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.addEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className='bg-gray-900 max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out pb-2 '>
            <div className={`bg-gray-900 xl:px-24  ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""} `}>
                <span className='header '><div className="bg-gray-900 navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <Link to="/trending" className="text-white btn btn-ghost text-xl">
                            🎬My Hub🎥
                        </Link>

                    </div>
                    <div className="flex gap-2 bg-gray-800">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

                    </div>
                </div></span>
            </div>
        </header>
    )
}

export default Header