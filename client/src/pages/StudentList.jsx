import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => {
        console.error('Error fetching students:', error);
        toast.error('Failed to fetch students!');
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://localhost:5000/students/${id}`)
        .then(() => {
          setStudents(students.filter(student => student._id !== id));
          toast.success('Student deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting student:', error);
          toast.error('Failed to delete student!');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📘 Student Records</h2>
        
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Roll Number</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date of Birth</th>
              <th className="p-3">Department</th>
              <th className="p-3">Enrollment Year</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3 text-center">{student.firstName}</td>
                <td className="p-3 text-center">{student.lastName}</td>
                <td className="p-3 text-center">{student.rollNumber}</td>
                <td className="p-3 text-center">{student.branch}</td>
                <td className="p-3 text-center">{student.email}</td>
                <td className="p-3 text-center">{student.dob?.slice(0, 10)}</td>
                <td className="p-3 text-center">{student.department}</td>
                <td className="p-3 text-center">{student.enrollmentYear}</td>
                <td className="p-3 text-center">{student.isActive ? '✅' : '❌'}</td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/edit/${student._id}`}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No students found.</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default StudentList;
