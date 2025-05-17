"use client"
import { useState, useEffect } from 'react';

const useScrollDirection = () => {
    const [scrollUp, setScrollUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updateScrollDirection = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setScrollUp(false); // Scrolling down
            } else if (currentScrollY < lastScrollY) {
                setScrollUp(true); // Scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', updateScrollDirection);

        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [lastScrollY]);

    return scrollUp;
};

export default useScrollDirection;
