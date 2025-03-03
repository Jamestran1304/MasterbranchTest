import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">📅 Calendar App</h1>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/add-event" className="bg-white text-blue-500 px-3 py-1 rounded">Add Event</Link>
      </div>
    </nav>
  );
}

export default Navbar;
