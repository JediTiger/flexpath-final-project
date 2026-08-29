import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recordService } from '../../services/api';
import { vehicleService } from '../../services/api';

export default function VehicleDetails() {
    const { id } = useParams();
    const [records, setRecords] = useState([]);

    const [serviceName, setServiceName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [mileage, setMileage] = useState('');
    const [serviceDate, setServiceDate] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);

    const [searchName, setSearchName] = useState('');
    const [searchProvider, setSearchProvider] = useState('');

    const [sortBy, setSortBy] = useState('serviceDate');
    const [direction, setDirection] = useState('desc');

    // FIXME: This should fetch the records for the active user
    const loadServiceTimeline = async () => {
        try {
            const data = await recordService.getRecordsByVehicle(id, sortBy, direction);
            setRecords(data);
        } catch (err) {
            console.error("Error loading service entries:", err);
        }
    };

    // FIXME: Is there a way to remove the props so useEffect isn't constantly watching?
    // So this is watching the id and sortBy so when they change it can call the function and update
    useEffect(() => {
        loadServiceTimeline();
    }, [id, sortBy, direction]);

    // An event listener to handle search requests
    const handleSearchFilters = async (event) => {
        event.preventDefault();
        if (!searchName.trim() && !searchProvider.trim()) {
            await loadServiceTimeline();
            return;
        }
        try {
            const data = await recordService.searchRecords(id, searchProvider, searchName);
            setRecords(data);
        } catch (err) {
            console.error("Search query execution failure:", err);
        }
    };

    const handleLogServiceItem = async (e) => {
        e.preventDefault();
        const servicePayload = {
            vehicleId: parseInt(id, 10),
            serviceName: serviceName.trim(),
            serviceProvider: serviceProvider.trim(),
            description: description.trim(),
            cost: parseFloat(cost),
            mileage: mileage ? parseInt(mileage, 10) : null,
            serviceDate,
            private: isPrivate
        };

        try {
            await recordService.createRecord(servicePayload);

            setServiceName(''); setServiceProvider(''); setDescription(''); setCost(''); setMileage(''); setServiceDate('');
            await loadServiceTimeline();
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveRecord = async (recordId) => {
        if (window.confirm("Permanently erase this maintenance record entry?")) {
            try {
                await recordService.deleteRecord(recordId);
                await loadServiceTimeline();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            {/* TODO: Need to add this tot he vehicle details page so you dont have to user browser back button */}
            <Link to="/garage" className="btn btn-sm btn-outline-secondary mb-3">← Back to Garage</Link>
            <h2 className="mb-4 fw-bold text-dark">Vehicle Maintenance Logs</h2>

            {/* Search bar */}
            <form onSubmit={handleSearchFilters} className="row g-2 p-3 mb-4 bg-white rounded shadow-sm align-items-center border">
                <div className="col-12"><span className="text-uppercase text-muted small fw-bold tracking-wider">Query Logs Filters:</span></div>
                <div className="col-md-4">
                    <input type="text" className="form-control bg-light border-0" placeholder="Service text match (LIKE)..." value={searchName} onChange={e => setSearchName(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control bg-light border-0" placeholder="Exact service provider shop..." value={searchProvider} onChange={e => setSearchProvider(e.target.value)} />
                </div>
                <div className="col-md-4 d-flex gap-2">
                    <button type="submit" className="btn btn-dark w-50 fw-bold">Apply Filters</button>
                    <button type="button" onClick={async () => { setSearchName(''); setSearchProvider(''); await loadServiceTimeline(); }} className="btn btn-outline-secondary w-50">Reset</button>
                </div>
            </form>

            {/* Sorting controls */}
            <div className="d-flex align-items-center gap-3 mb-4 bg-white p-3 rounded shadow-sm border">
                <span className="fw-bold text-muted small text-uppercase tracking-wider">Sort Log Items By:</span>
                <select value={sortBy} onChange={event => setSortBy(event.target.value)} className="form-select form-select-sm w-auto bg-light">
                    <option value="serviceDate">Calendar Date</option>
                    <option value="cost">Invoiced Cost</option>
                </select>
                <select value={direction} onChange={event => setDirection(event.target.value)} className="form-select form-select-sm w-auto bg-light">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Service records table */}
            <div className="table-responsive bg-white rounded shadow-sm p-3 mb-5 border">
                <table className="table align-middle mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>Maintenance Item</th>
                        <th>Provider / Shop</th>
                        <th>Execution Date</th>
                        <th>Invoice Total</th>
                        <th>Odometer</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.length === 0 ? (
                        <tr><td colSpan="6" className="text-center text-muted py-4">No logged records corresponding to the selected scope.</td></tr>
                    ) : null}
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>
                                <strong className="text-dark">{record.serviceName}</strong>
                                {record.description && <div className="text-muted small mt-1">{record.description}</div>}
                            </td>
                            <td>{record.serviceProvider || <span className="text-muted small">Not Logged</span>}</td>
                            <td>{record.serviceDate}</td>
                            <td className="fw-bold text-success">${record.cost.toFixed(2)}</td>
                            <td>{record.mileage ? `${record.mileage.toLocaleString()} mi` : <span className="text-secondary small">Omitted</span>}</td>
                            <td>
                                <button onClick={() => handleRemoveRecord(record.id)} className="btn btn-sm btn-link text-danger text-decoration-none">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Create new service record inputs */}
            <div className="card p-4 shadow-sm border-0 bg-white" style={{ maxWidth: '550px' }}>
                <h4 className="mb-3 fw-bold text-dark">⚙️ Log a New Maintenance Item</h4>
                <form onSubmit={handleLogServiceItem}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Service Needed</label>
                        <input type="text" placeholder="e.g., Brake Pad Replacement" value={serviceName} onChange={e => setServiceName(e.target.value)} required className="form-control bg-light border-0 py-2" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Service Provider / Automotive Shop Name</label>
                        <input type="text" placeholder="e.g., Jiffy Lube, Local Mechanic" value={serviceProvider} onChange={e => setServiceProvider(e.target.value)} className="form-control bg-light border-0 py-2" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Work Summary Description</label>
                        <textarea placeholder="List part numbers or additional repair context notes..." value={description} onChange={e => setDescription(e.target.value)} className="form-control bg-light border-0" style={{ height: '70px' }} />
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Total Cost Invoiced ($)</label>
                            <input type="number" step="0.01" min="0" placeholder="0.00" value={cost} onChange={e => setCost(e.target.value)} required className="form-control bg-light border-0 py-2" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Mileage Value (Optional)</label>
                            <input type="number" placeholder="Odometer reading" value={mileage} onChange={e => setMileage(e.target.value)} className="form-control bg-light border-0 py-2" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Execution Date</label>
                        <input type="date" value={serviceDate} onChange={e => setServiceDate(e.target.value)} required className="form-control bg-light border-0 py-2" />
                    </div>
                    <div className="mb-4 form-check form-switch p-3 bg-light rounded ms-0 mx-0" style={{ paddingLeft: '2.5em' }}>
                        <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} className="form-check-input" id="privateRecordCheck" />
                        <label className="form-check-label fw-medium text-dark ms-2" htmlFor="privateRecordCheck">Keep this record entry private</label>
                    </div>
                    <button type="submit" className="btn btn-secondary w-100 py-2 fw-bold shadow-sm">Save Maintenance Entry</button>
                </form>
            </div>
        </div>
    );
}