import { ltc } from '../../backend/src/main/utilities/logToConsole.js'

const urlBase = '/api';

/*
    Working to centralize the API calls to here.
    Instead of having each method have to construct the api url and send a request
    This will field those requests and return the response
*/
// This queries the browsers localStorage for the authorization header
// const getAuthHeader = () => localStorage.getItem('authHeader');
// FIXME: Getting a 401 error due to JWT not getting a Bearer token it expects
const getAuthHeader = () => {
    let token = localStorage.getItem('authHeader');
    ltc("api.js", "localStorage", localStorage)
    if (!token) return '';


// "Vehicle service"
const vehicleService = {
    // Fetch vehicles (Spring Security Principal resolves user internally)
    getMyVehicles: async (sortBy, direction) => {
        const query = `sortBy=${sortBy}&direction=${direction}`;
        const response = await fetch(`${urlBase}/vehicles/my?${query}`, {
            headers: {
                'Authorization': getAuthHeader(),
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Network query failure fetching vehicles');
        return response.json();
    },

    // Create a vehicle
    createVehicle: async (vehicleData) => {
        const response = await fetch(`${urlBase}/vehicles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify(vehicleData)
        });
        if (!response.ok) throw new Error('Failed to save vehicle profile');
        return response.json();
    },

    // Clear a single vehicle configuration registration out of database memory
    deleteVehicle: async (id) => {
        const response = await fetch(`${urlBase}/vehicles/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': getAuthHeader() }
        });
        if (!response.ok) throw new Error('Failed to delete vehicle profile');
        return true;
    }
};

// Service record service
export const recordService = {
    // Get records by vehicle (FIXME: and should be user)
    /*
    Ok so a vehicle is owned by that user and each record is connected to a vehicle id so we only need to find that
     */
    getRecordsByVehicle: async (vehicleId, sortBy, direction) => {
        const query = `sortBy=${sortBy}&direction=${direction}`;
        const response = await fetch(`${urlBase}/service-records/vehicle/${vehicleId}?${query}`, {
            headers: { 'Authorization': getAuthHeader() }
        });
        if (!response.ok) throw new Error('Network query failure fetching maintenance timelines');
        return response.json();
    },

    // Search method
    searchRecords: async (vehicleId, name, provider) => {
        const query = `vehicleId=${vehicleId}&name=${encodeURIComponent(name)}&provider=${encodeURIComponent(provider)}`;
        const response = await fetch(`${urlBase}/service-records/search?${query}`, {
            headers: { 'Authorization': getAuthHeader() }
        });
        if (!response.ok) throw new Error('Query log filter search execution crash');
        return response.json();
    },

    // Create a service record
    createRecord: async (recordData) => {
        const response = await fetch(`${urlBase}/service-records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify(recordData)
        });
        if (!response.ok) throw new Error('Failed to log maintenance entry');
        return response.json();
    },

    // Delete a service record
    deleteRecord: async (id) => {
        const response = await fetch(`${urlBase}/service-records/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': getAuthHeader()}
        });
        if (!response.ok) throw new Error('Failed to erase log entry row reference');
        return true;
    }
}
};
