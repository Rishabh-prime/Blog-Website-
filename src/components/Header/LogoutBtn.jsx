import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      window.location.reload(); // 🔁 Refresh the page after logout
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-5 py-2 text-sm font-medium rounded-full bg-[#EAD7C3] text-[#4B3621] hover:bg-[#C8B6A6] shadow-sm transition-all cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
