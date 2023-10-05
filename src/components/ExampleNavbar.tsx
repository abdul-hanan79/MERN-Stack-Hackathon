import { useState } from 'react';
import Link from 'next/link';

const ExampleNavbar = () => {
    // State to track whether the links should be shown on small screens
    const [showLinks, setShowLinks] = useState(false);

    // Function to toggle the visibility of links
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <span className="text-white text-2xl font-bold">Your Logo</span>
                </Link>

                {/* Button for small screens */}
                <button
                    className="lg:hidden text-white text-xl"
                    onClick={toggleLinks}
                >
                    {showLinks ? 'Close' : 'Menu'}
                </button>

                {/* Links for large screens */}
                <ul className={`lg:flex space-x-4 ${showLinks ? 'block' : 'hidden'}`}>
                    <li>
                        <Link href="/">
                            <span className="text-white">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <span className="text-white">About</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <span className="text-white">Contact</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default ExampleNavbar;
