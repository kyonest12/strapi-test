import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const NavBar = () => {
    const cookies = new Cookies();
    const handleLogout = () => {
        cookies.remove("jwt")
    }

    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">MyApp</div>
            <div>
                <button className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600" onClick={handleLogout}>
                    <Link to="/"> Logout </Link>
                </button>
            </div>
        </div>
        </nav>
    );
};

export default NavBar;