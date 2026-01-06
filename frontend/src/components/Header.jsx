import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Send, Home, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Send size={18} /> },
  ];

  if (isLoggedIn) {
    navItems.push({ name: 'Dashboard', path: '/enquiries', icon: <LayoutDashboard size={18} /> });
  }

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">Portfolio.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive(item.path)
                    ? 'text-primary font-semibold bg-indigo-50'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive('/login')
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                    ? 'text-primary bg-indigo-50'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
