import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container-fluid px-0">
            <div className="bg-dark text-white rounded p-5 mb-5 shadow-sm text-center">
                <div className="py-4">
                    <h1 className="display-4 fw-bold mb-3">Welcome to Ride Steward</h1>
                    {/* FIXME: Should replace madWidth with something from Bootstrap */}
                    <p className="lead fs-4 text-white-50 mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                        The streamlined ride manager! Track your rides, log repairs. Designed to protect vehicle longevity, log verifiable repair histories, and curate shared service insights.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/garage" className="btn btn-primary btn-lg px-4 fw-bold shadow-sm">
                            Open My Garage
                        </Link>
                        <Link to="/browse" className="btn btn-outline-light btn-lg px-4 fw-bold">
                            Browse Community Logs
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row g-4 text-start">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-3 bg-white">
                        <div className="card-body">
                            <div className="fs-2 mb-2">📂</div>
                            <h5 className="fw-bold text-dark">Group by Vehicle</h5>
                            <p className="text-secondary small mb-0">
                                Organize your maintenance tasks into distinct vehicle profiles. Track make, model, and year specifications dynamically under single grouping folders.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-3 bg-white">
                        <div className="card-body">
                            <div className="fs-2 mb-2">🔧</div>
                            <h5 className="fw-bold text-dark">Track Service Items</h5>
                            <p className="text-secondary small mb-0">
                                Log explicit service logs including task details, exact service providers, date execution tags, financial invoicing costs, and odometer tracking values.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-3 bg-white">
                        <div className="card-body">
                            <div className="fs-2 mb-2">🔒</div>
                            <h5 className="fw-bold text-dark">Visibility Controls</h5>
                            <p className="text-secondary small mb-0">
                                Toggle your vehicle garage profiles or individual service record line items between private and public states to control community disclosure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
