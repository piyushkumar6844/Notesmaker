import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';

const User = () => {
  const context = useContext(noteContext);
  const {user,getuser } = context;
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem('token')) {
        await getuser();
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>User Information</h1>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
