import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-[#DCC6AC] border-t-4 border-[#BFA58A] shadow-sm">
      <Container>
        <nav className="flex flex-wrap items-center justify-between">
          <div className="mr-6">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="px-3 py-2 rounded-md text-[#4B3621] hover:bg-[#C8B6A6] focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex ml-auto items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2 text-sm font-medium rounded-full bg-[#EAD7C3] text-[#4B3621] hover:bg-[#C8B6A6] shadow-sm transition-all cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="w-full lg:hidden">
              <ul className="flex flex-col items-center space-y-2 pt-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name} className="w-full text-center">
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-5 py-2 text-sm font-medium rounded-full bg-[#EAD7C3] text-[#4B3621] hover:bg-[#C8B6A6] shadow-sm transition-all cursor-pointer"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <li className="w-full text-center">
                    <LogoutBtn mobile={true} onClick={() => setIsMenuOpen(false)} />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;