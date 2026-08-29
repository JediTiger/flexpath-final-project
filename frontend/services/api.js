const urlBase = 'http://localhost:8080';

// Since a user should always be logged in, grab the current user from the browser DOM and fetch those records
// In case there is no activeUser in localStorage, the fallback is user 1
const getUsername = () => localStorage.getItem('activeUser') || 'user 1';

export const vehicleService = {
    // Fetch vehicles (Automatically reads and builds the query parameters natively)
    getMyVehicles: async (sortBy, direction) => {
        const query = `username=${encodeURIComponent(getUsername())}&sortBy=${sortBy}&direction=${direction}`;
        const response = await fetch(`${urlBase}/vehxicles/my?${query}`);
        console.log(query);
        if (!response.ok) throw new Error('Network query failure fetching vehicles');
        return response.json();
    },
};
