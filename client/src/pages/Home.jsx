const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="text-center p-10 bg-white rounded-lg shadow-xl animate-fadeIn max-w-xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Welcome to the Student Management System
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Manage student information efficiently. You can add, view, edit, and delete student records all in one place.
        </p>
        <div className="space-x-4">
          <a
            href="/students"
            className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-medium px-6 py-2 rounded transition"
          >
            View Students
          </a>
          <a
            href="/add"
            className="bg-green-200 hover:bg-green-300 text-green-900 font-medium px-6 py-2 rounded transition"
          >
            Add Student
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
