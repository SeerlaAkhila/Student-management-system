import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    branch: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: false
  });

  useEffect(() => {
    // Updated to use deployed backend URL
    axios.get(`https://student-management-system-gk5e.onrender.com/students/${id}`)
      .then(response => {
        const studentData = response.data;
        if (typeof studentData.isActive === 'string') {
          studentData.isActive = studentData.isActive === 'true';
        }
        setStudent(studentData);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        toast.error('Failed to fetch student data!');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...student,
      enrollmentYear: Number(student.enrollmentYear),
    };

    // Updated to use deployed backend URL
    axios.put(`https://student-management-system-gk5e.onrender.com/students/${id}`, updatedStudent)
      .then(() => {
        toast.success('Student updated successfully!');
        setTimeout(() => navigate('/students'), 2000);
      })
      .catch(error => {
        console.error('Error updating student:', error);
        toast.error('Failed to update student!');
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'rollNumber', 'branch', 'email', 'department'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={student[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border p-2 mb-2 w-full"
          />
        ))}
        <input
          type="date"
          name="dob"
          value={student.dob?.slice(0, 10) || ''}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="enrollmentYear"
          value={student.enrollmentYear}
          onChange={handleChange}
          placeholder="Enrollment Year"
          className="border p-2 mb-2 w-full"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="isActive"
            checked={student.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isActive">Is Active</label>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Update Student</button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default EditStudent;
