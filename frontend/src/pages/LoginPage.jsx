import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please enter both username and password');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success(`Welcome back, ${res.data.username}!`);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-100 rounded-bl-full mix-blend-multiply opacity-50 filter blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-100 rounded-tr-full mix-blend-multiply opacity-50 filter blur-3xl pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 relative z-10"
            >
                <div className="text-center mb-12">
                    <div className="mx-auto h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600 shadow-md border border-indigo-100">
                        <Lock size={36} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Admin Login</h2>
                    <p className="text-slate-600 text-lg font-medium">
                        Sign in to access your dashboard
                    </p>
                </div>

                <form className="space-y-8" onSubmit={handleLogin}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-3 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                                    <User className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field pl-16 pr-4 py-3.5 w-full bg-white border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-3 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-16 pr-4 py-3.5 w-full bg-white border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex justify-center items-center py-4 text-lg font-bold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-6 w-6" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="ml-2 h-6 w-6" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-medium bg-white/50 py-2 px-4 rounded-full inline-block border border-slate-100">
                        Restricted area. Authorized personnel only.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
