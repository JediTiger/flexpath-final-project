import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Garage from './pages/Garage';
import VehicleDetails from './pages/VehicleDetails';
import PublicBrowse from './pages/PublicBrowse';
import { UserProvider } from "./hooks/useActiveUser.jsx";

function App() {
    return (
        <Router>
            <UserProvider>
                <div className="min-vh-100 bg-light">
                    {/* Nav bar for all pages, also includes the User Switcher */}
                    <Navbar />
                    {/* User Switcher */}
                    {/* FIXME: Should replace the maxWidth's with something from Bootstrap */}
                    <main className="container-fluid text-start px-4 py-4" style={{ maxWidth: '1000px', margin: '0' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/garage" element={<Garage />} />
                            <Route path="/vehicle/:id" element={<VehicleDetails />} />
                            <Route path="/browse" element={<PublicBrowse />} />
                        </Routes>
                    </main>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;
