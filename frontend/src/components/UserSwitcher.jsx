import { useActiveUser } from '../hooks/useActiveUser.jsx';

function UserSwitcher() {
    const { activeUser, changeUser } = useActiveUser();

    return (
        <div className="dropdown">
            <button
                className="btn btn-sm btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span className="opacity-75 small">Active User:</span>
                <strong>{activeUser}</strong>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userDropdown">
                <li>
                    <button
                        className={`dropdown-item ${activeUser === 'user 1' ? 'active' : ''}`}
                        onClick={() => changeUser('user 1')}
                    >
                        User 1
                    </button>
                </li>
                <li>
                    <button
                        className={`dropdown-item ${activeUser === 'user 2' ? 'active' : ''}`}
                        onClick={() => changeUser('user 2')}
                    >
                        User 2
                    </button>
                </li>
                <li>
                    <button
                        className={`dropdown-item ${activeUser === 'admin' ? 'active' : ''}`}
                        onClick={() => changeUser('admin')}
                    >
                        Admin
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default UserSwitcher;
