import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContexts';

const Navbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/sign-in");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="w-full bg-[#4267B2] flex items-center justify-between p-2">

            <div className="text-white text-lg hover:cursor-pointer" onClick={() => {
                navigate('home');
            }}>C-form</div>


            <div className="flex space-x-4">
                <button className="text-white  px-0 py-2 rounded-md" onClick={() => { navigate('build') }}>Create Form</button>
                <button className="text-white  px-0 py-2 rounded-md" onClick={() => { navigate('home') }}>All Forms</button>
            </div>


            <div className="relative">
                <button
                    className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={toggleDropdown}
                >
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile Avatar"
                        className="w-full h-full rounded-full"
                    />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 top-12 bg-white shadow-md rounded-md p-2">
                        <button
                            className="text-red-500"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
