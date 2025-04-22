import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Student List</Link></li>
        <li><Link to="/add">Add Student</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
