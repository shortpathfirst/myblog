"use client"
import { useState, useEffect } from 'react';

const useScrollTop = () => {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        /**
         * Return the Percentage of scroll of the page.
         */
        const onScroll = () => {
            // This will calculate how many pixels the page is vertically
            const winScroll = document.documentElement.scrollTop;
            // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrolled = (winScroll / height) * 100;

            setScrollTop(scrolled);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return scrollTop;
};

export default useScrollTop;
