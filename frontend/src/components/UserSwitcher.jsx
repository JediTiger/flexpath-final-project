import { useState, useEffect } from 'react';
import { ltc } from '/Users/sean/dev/lc/flexpath/flexpath-final-project/backend/src/main/utilities/logToConsole.js';

/* In my attempt to centralize the active user setup I have broken the app
   FIXME: Ok. So the problem is I was avoiding Spring Boot Security so I'm moving back to the Principal thing
   But doing so seems to have caused a new issue. Now all my api requests are being 401'd
 That leads me to believe its a security issue?
*/
export default function UserSwitcher() {
    ltc("UserSwitcher","localStorage", localStorage)
    // Check localStorage for activeUser and sets it to 'user 1' if not found
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('activeUser') || 'user 1');
    // TODO: Research this more. Need to make sure its not the problem
    const encodeBase64 = (str) => {
        const bytes = new TextEncoder().encode(str);
        const binString = String.fromCodePoint(...bytes);
        const binStr = btoa(binString)
        ltc("UserSwitcher", "binString", binStr);
        return binStr

    };

    // If the encodeBase above is working this should be ok as is
    // This checks the localStorage for a user when the page loads. If localStorage is empty it makes it 'user 1'
    useEffect(() => {
        if (!localStorage.getItem('activeUser') || !localStorage.getItem('authHeader')) {
            localStorage.setItem('activeUser', 'user 1');
            const defaultToken = encodeBase64('user 1:password');
            localStorage.setItem('authHeader', `Basic ${defaultToken}`);
            setCurrentUser('user 1');
        }
    }, []);

    // An event listener to update the localStorage with the new user when the drop down is changed
    // And then force a page reload so the view updates to account for the change in user
    const handleUserChange = (event) => {
        const newUser = event.target.value;
        localStorage.setItem('activeUser', newUser);
        const password = "password";

        const token = encodeBase64(`${newUser}:${password}`);
        localStorage.setItem('authHeader', `Basic ${token}`);

        setCurrentUser(newUser);
        // TODO: Is this the best idea? The point of React is to not have to reload the entire page
        window.location.reload();
    };
    return (
        <div className="d-flex align-items-center gap-2 text-white">
            <span className="small text-muted text-uppercase fw-bold">Active Profile:</span>
            <select
                value={currentUser}
                onChange={handleUserChange}
                className="form-select form-select-sm bg-secondary text-white border-0 w-auto"
                style={{ cursor: 'pointer' }}
            >
                <option value="user 1">User 1 (Regular)</option>
                <option value="user 2">User 2 (Regular)</option>
                <option value="admin">System Administrator</option>
            </select>
        </div>
    );
}