import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedStudent = {
      ...student,
      enrollmentYear: Number(student.enrollmentYear),
    };

    axios.post('http://localhost:5000/students', formattedStudent)
      .then(() => navigate('/students'))
      .catch(error => console.error('Error adding student:', error));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'rollNumber', 'branch', 'email', 'department'].map(field => (
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
          value={student.dob}
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
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
