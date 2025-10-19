import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, fetchusers, updateUserInfo } from '../../../Redux/slice/adminSlice';

const UserManagement = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.auth);
const {users,loading,error}=useSelector((state)=>state.admin);
useEffect(() => {
  if (user && user.role === "admin") {
    dispatch(fetchusers());
  } else {
    navigate("/");
  }
}, [user, dispatch, navigate]);




  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    const newUser = {
      _id: Date.now(), // unique id
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    setUsers([...users, newUser]);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserInfo({id:userId,role:newRole}));
  };

  const handleDelete = (userId) => {
   if (window.confirm("Are you sure you want to delete this user?")) {
   dispatch(deleteUser(userId));
   }
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      {loading && <p>loading..</p>}
      {error && <p>error:{error}</p>}

      {/* Add New User Form */}
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-lg font-bold mb-4'>Add New User</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              placeholder='Enter name'
              required
            />
          </div>

          <div>
            <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              placeholder='Enter email'
              required
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              placeholder='Enter password'
              required
            />
          </div>

          <div>
            <label htmlFor="role" className='block text-gray-700 text-sm font-bold mb-2'>Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Table */}
      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Email</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Role</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className='border rounded px-2 py-1'
                  >
                    
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className='text-red-600 hover:underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
