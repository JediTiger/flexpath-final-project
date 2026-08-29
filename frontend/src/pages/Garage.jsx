import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useActiveUser } from '../hooks/useActiveUser.jsx';
// ~/flexpath/flexpath-final-project/frontend/src/hooks/useActiveUser.js
export default function Garage() {
    const { activeUser, getQueryParam } = useActiveUser();

    const [vehicles, setVehicles] = useState([]);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [sortBy, setSortBy] = useState('year');
    const [direction, setDirection] = useState('desc');

    const fetchVehicles = async () => {
        try {
            const urlServer = 'http://localhost';
            const urlPort = "8080";
            const urlPath = `/api/vehicles/my?${getQueryParam()}&`;

            const url = `${urlServer}:${urlPort}${urlPath}sortBy=${sortBy}&direction=${direction}`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setVehicles(data);
            }
        } catch (err) {
            console.error("Error loading garage profiles:", err);
        }
    };

    useEffect(() => {
        const loadGarage = async () => {
            await fetchVehicles();
        };
        loadGarage();
    }, [sortBy, direction, activeUser]);

    const handleCreateVehicle = async (event) => {
        event.preventDefault();
        const newVehicle = { make, model, year: parseInt(year, 10), private: isPrivate };
        try {
            const response = await fetch(`http://localhost:8080/api/vehicles?${getQueryParam()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVehicle)
            });
            if (response.ok) {
                setMake(''); setModel(''); setYear('');
                await fetchVehicles();
            }
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this vehicle?")) {
            try {
                await fetch(`http://localhost:8080/api/vehicles/${id}?${getQueryParam()}`, {
                    method: 'DELETE'
                });
                await fetchVehicles();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>My Garage (Vehicles)</h2>
                    <p className="text-muted">Currently viewing files as: <strong className="text-primary">{activeUser}</strong></p>
                </div>
            </div>

            <div className="card mb-4 bg-body-tertiary border-0 shadow-sm">
                <div className="card-body d-flex align-items-center gap-3">
                    <label className="fw-bold mb-0">Sort Garage By:</label>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-select w-auto">
                        <option value="year">Model Year</option>
                        <option value="make">Manufacturer</option>
                    </select>
                    <select value={direction} onChange={e => setDirection(e.target.value)} className="form-select w-auto">
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {vehicles.length === 0 ? (
                    <div className="col-12 w-100">
                        <div className="p-4 text-center bg-white rounded border">
                            <p className="text-muted mb-0">No active vehicles registered to your user profile garage.</p>
                        </div>
                    </div>
                ) : null}
                {vehicles.map(v => (
                    <div key={v.id} className="col">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{v.year} {v.make} {v.model}</h5>
                                <p className="card-text text-secondary">Status: {v.private ? '🔒 Private' : '🌐 Public'}</p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <Link to={`/vehicle/${v.id}`} className="btn btn-primary btn-sm">🔧 View Service Log</Link>
                                    <button onClick={() => handleDelete(v.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card p-4 shadow-sm border-0 bg-white" style={{ maxWidth: '500px' }}>
                <h4 className="mb-3 fw-bold">➕ Add a Vehicle</h4>
                <form onSubmit={handleCreateVehicle}>
                    <div className="mb-3"><input type="text" placeholder="Make" value={make} onChange={e => setMake(e.target.value)} required className="form-control" /></div>
                    <div className="mb-3"><input type="text" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} required className="form-control" /></div>
                    <div className="mb-3"><input type="number" placeholder="Production Year" value={year} onChange={e => setYear(e.target.value)} required className="form-control" /></div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} className="form-check-input" id="privateCheck" />
                        <label className="form-check-label text-muted" htmlFor="privateCheck">Keep this profile private</label>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Save Vehicle Profile</button>
                </form>
            </div>
        </div>
    );
}