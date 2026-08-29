import { useState, useEffect } from 'react';

function PublicBrowse() {
    const [publicVehicles, setPublicVehicles] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [publicLogs, setPublicLogs] = useState([]);

    useEffect(() => {
        fetch('/api/vehicles/public')
            .then(res => res.json())
            .then(data => setPublicVehicles(data))
            .catch(err => console.error("Error connecting to public stream:", err));
    }, []);

    const loadSharedRecords = async (vehicle) => {
        setSelectedCar(vehicle);
        try {
            const res = await fetch(`/api/service-records/vehicle/${vehicle.id}`);
            const data = await res.json();
            setPublicLogs(data.filter(log => !log.private));
        } catch (err) { console.error(err); }
    };
// FIXME: The public page shows the correct vehicles for user 1 and 2 but not for admin. Also no service records appear
    return (
        <div>
            <h2 className="fw-bold mb-2">🌐 Public Maintenance Archives</h2>
            <p className="text-secondary mb-4">Browse public maintenance logs shared by community owners.</p>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-white h-100">
                        <h4 className="fw-bold mb-3">Garages</h4>
                        {publicVehicles.length === 0 ? <p className="text-muted small">No public profiles shared yet.</p> : null}
                        {publicVehicles.map(v => (
                            <div key={v.id} className="p-3 bg-light rounded border mb-2 d-flex flex-column gap-2">
                                <h6 className="mb-0 fw-bold">{v.year} {v.make} {v.model}</h6>
                                <button onClick={() => loadSharedRecords(v)} className="btn btn-sm btn-primary w-100">View Logs</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm border-0 p-4 bg-white h-100">
                        {selectedCar ? (
                            <div>
                                <h4 className="fw-bold mb-3">Logs for: {selectedCar.year} {selectedCar.make} {selectedCar.model}</h4>
                                {publicLogs.length === 0 ? <p className="text-muted italic small">No public history events listed.</p> : (
                                    <div className="list-group list-group-flush">
                                        {publicLogs.map(l => (
                                            <div key={l.id} className="list-group-item px-0 py-3">
                                                <h5 className="mb-1 text-dark fw-bold">{l.serviceName}</h5>
                                                <p className="mb-1 text-secondary small">{l.description}</p>
                                                <small className="text-muted d-block">Performed by: {l.serviceProvider || 'Independent'} on {l.serviceDate}</small>
                                                {l.mileage && <small className="badge bg-secondary mt-2">{l.mileage.toLocaleString()} mi</small>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 py-5">
                                <p className="text-muted font-italic mb-0">Select an open vehicle profile from the left column to inspect its service log history.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicBrowse;
