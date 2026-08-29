import { Link } from 'react-router-dom';
import UserSwitcher from './UserSwitcher';

function Navbar() {
    return (
        // Nav bar
        <nav className="navbar navbar-expand navbar-dark bg-dark shadow-sm">
            <div className="container-fluid px-4 d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                    <Link to="/" className="navbar-brand me-4 d-flex align-items-center">
                        <span className="d-inline-block border border-secondary rounded px-2 py-0 me-2 text-white bg-secondary small fw-bold">RS</span>
                        <strong className="text-white tracking-wide">Ride Steward</strong>
                    </Link>
                    <div className="navbar-nav">
                        <Link to="/garage" className="nav-link text-white me-3">My Garage</Link>
                        <Link to="/browse" className="nav-link text-white">Public Archives</Link>
                    </div>
                </div>
                {/* Add User Switcher */}
                <div className="ms-auto">
                    <UserSwitcher />
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
