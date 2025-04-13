import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setStatus(token ? 'authenticated' : 'unauthenticated');
  }, []);

  const signOut = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const signIn = () => {
    navigate('/login');
  };

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <button
        onClick={signIn}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }

  return (
    <button
      onClick={signOut}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};
