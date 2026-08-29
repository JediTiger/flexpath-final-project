import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function VehicleDetails() {
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

    const fetchRecords = async () => {
        const res = await fetch(`/api/service-records/vehicle/${id}?sortBy=${sortBy}&direction=${direction}`);
        const data = await res.json();
        setRecords(data);
    };
    // FIXME: Need to fix this broken promise; doesn't this load every time the page updates?
    useEffect(() => { fetchRecords(); }, [id, sortBy, direction]);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchName && !searchProvider) { fetchRecords(); return; }
        const res = await fetch(`/api/service-records/search?vehicleId=${id}&provider=${searchProvider}&name=${searchName}`);
        const data = await res.json();
        setRecords(data);
    };

    const handleAddRecord = async (event) => {
        event.preventDefault();
        const newRecord = {
            vehicleId: parseInt(id), serviceName, serviceProvider, description,
            cost: parseFloat(cost), mileage: mileage ? parseInt(mileage) : null, serviceDate, private: isPrivate
        };
        await fetch('/api/service-records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
        });
        setServiceName(''); setServiceProvider(''); setDescription(''); setCost(''); setMileage(''); setServiceDate('');
        fetchRecords();
    };

    const handleDelete = async (recordId) => {
        if (window.confirm("Remove this entry log file permanently?")) {
            await fetch(`/api/service-records/${recordId}`, { method: 'DELETE' });
            fetchRecords();
        }
    };

    return (
        <div>
            <Link to="/" className="btn btn-sm btn-outline-secondary mb-3">← Back to Garage</Link>
            <h2 className="mb-4 fw-bold">Vehicle Maintenance Timeline</h2>

            {/* FIXME: This search field does not appear on any page ?? */}
            <form onSubmit={handleSearch} className="row g-2 p-3 mb-4 bg-body-tertiary rounded shadow-sm align-items-center">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Search service name (LIKE)..." value={searchName} onChange={e => setSearchName(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Search provider..." value={searchProvider} onChange={e => setSearchProvider(e.target.value)} />
                </div>
                <div className="col-md-4 d-flex gap-2">
                    <button type="submit" className="btn btn-dark w-50">Filter Items</button>
                    <button type="button" onClick={() => { setSearchName(''); setSearchProvider(''); fetchRecords(); }} className="btn btn-secondary w-50">Reset</button>
                </div>
            </form>

            <div className="d-flex align-items-center gap-3 mb-4 bg-white p-3 rounded shadow-sm">
                <label className="fw-bold mb-0">Sort Log Lists By:</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-select w-auto">
                    <option value="serviceDate">Calendar Date</option>
                    <option value="cost">Invoiced Cost</option>
                </select>
                <select value={direction} onChange={e => setDirection(e.target.value)} className="form-select w-auto">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm p-3 mb-5">
                <table className="table align-middle mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>Maintenance Action Log</th>
                        <th>Provider</th>
                        <th>Execution Date</th>
                        <th>Invoice Cost</th>
                        <th>Odometer</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.length === 0 ? <tr><td colSpan="6" className="text-center text-muted py-4">No records found.</td></tr> : null}
                    {records.map(r => (
                        <tr key={r.id}>
                            <td><strong>{r.serviceName}</strong><br/><small className="text-muted">{r.description}</small></td>
                            <td>{r.serviceProvider || 'Not Specified'}</td>
                            <td>{r.serviceDate}</td>
                            <td className="fw-bold">${r.cost.toFixed(2)}</td>
                            <td>{r.mileage ? `${r.mileage.toLocaleString()} mi` : 'N/A'}</td>
                            <td><button onClick={() => handleDelete(r.id)} className="btn btn-sm btn-link text-danger text-decoration-none">Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="card p-4 shadow-sm border-0 bg-white" style={{ maxWidth: '500px' }}>
                <h4 className="mb-3 fw-bold">⚙️ Log a Maintenance Item</h4>
                <form onSubmit={handleAddRecord}>
                    <div className="mb-3">
                        <input type="text" placeholder="Service Needed" value={serviceName} onChange={
                            event => setServiceName(event.target.value)
                        }
                        required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Automotive Shop Name" value={serviceProvider} onChange={
                            event => setServiceProvider(event.target.value)}
                               className="form-control" />
                    </div>
                    {/* FIXME: Can the height go to Bootstrap? */}
                    <div className="mb-3">
                        <textarea placeholder="Detailed service descriptions..." value={description} onChange={
                            event => setDescription(event.target.value)
                        } className="form-control" style={{ height: '70px' }} />
                    </div>
                    <div className="mb-3">
                        <input type="number" step="0.01" placeholder="Total Cost Charged ($)" value={cost} onChange={
                            event => setCost(event.target.value)
                        } required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="number" placeholder="Odometer Mileage Tracking (Optional)" value={mileage} onChange={
                            event => setMileage(event.target.value)
                        } className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="date" value={serviceDate} onChange={
                            event => setServiceDate(event.target.value)
                        } required className="form-control" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} className="form-check-input" id="privateRecordCheck" />
                        <label className="form-check-label text-muted" htmlFor="privateRecordCheck">Keep log private</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Save Maintenance Entry</button>
                </form>
            </div>
        </div>
    );
}

export default VehicleDetails;
