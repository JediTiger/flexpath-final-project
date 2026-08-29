import { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
// /Users/sean/dev/lc/flexpath/flexpath-final-project/frontend/src/hooks/useActiveUser.js
// Trying to keep up with all the coding to track the logged-in user was getting too much so
// I had to get it into one file so I can figure it out easier
// Moving it on its own broke it, so I researched it and decided to go the context route to see if that will get it running again
const ActiveUserContext = createContext();

export function UserProvider({ children }) {
    const [activeUser, setActiveUser] = useState(localStorage.getItem('activeUser') || 'user 1');

    useEffect(() => {
        if (!localStorage.getItem('activeUser')) {
            localStorage.setItem('activeUser', 'user 1');
            setActiveUser('user 1');
        }
    }, []);

    const changeUser = (newUser) => {
        localStorage.setItem('activeUser', newUser);
        setActiveUser(newUser);
    };

    const getQueryParam = () => `username=${encodeURIComponent(activeUser)}`;
    return (
        <ActiveUserContext.Provider value={{ activeUser, changeUser, getQueryParam }}>
            {children}
        </ActiveUserContext.Provider>
    );
}

// Originally, this was a custom hook made to update the active user, but now it fetches it from the App parent
export function useActiveUser() {
    const context = useContext(ActiveUserContext);
    if (!context) {
        throw new Error('useActiveUser must be used within a UserProvider');
    }

    return context;
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};