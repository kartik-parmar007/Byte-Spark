import { useState, useEffect } from 'react';
import { Trash2, Eye, Search, ChevronLeft, ChevronRight, Inbox, RefreshCw, Calendar, DollarSign, Phone, LayoutGrid, List, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import EnquiryModal from '../components/EnquiryModal';

const Dashboard = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    const fetchEnquiries = async (page = 1, search = '') => {
        try {
            setLoading(true);
            // Increased limit for table view could be considered, but keeping consistent for now
            const res = await api.get(`/enquiries?page=${page}&limit=9&search=${search}`);
            setEnquiries(res.data.enquiries);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            toast.error('Failed to fetch enquiries');
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEnquiries(1, searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchEnquiries(newPage, searchTerm);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchEnquiries(currentPage, searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleDelete = async (id, e) => {
        e?.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

        try {
            await api.delete(`/enquiries/${id}`);
            toast.success('Enquiry deleted');
            fetchEnquiries(currentPage, searchTerm);
        } catch (error) {
            toast.error('Failed to delete enquiry');
        }
    };

    const handleView = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setIsModalOpen(true);
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate consistent color for avatar
    const getAvatarColor = (name) => {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-slate-600 text-lg">
                            Manage your client interactions and project proposals.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        {/* Search Bar */}
                        <div className="relative group w-full sm:w-80 lg:w-96">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:border-indigo-300"
                                placeholder="Search by Client or Project..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <div className="bg-white rounded-lg p-1 border border-slate-200 flex shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    title="Table View"
                                >
                                    <List size={20} />
                                </button>
                            </div>

                            <button
                                onClick={handleRefresh}
                                className={`p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm ${refreshing ? 'animate-spin' : ''}`}
                                title="Refresh"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-64"></div>
                        ))}
                    </div>
                ) : enquiries.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 border-dashed"
                    >
                        <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Inbox className="h-10 w-10 text-indigo-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No enquiries found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            {searchTerm ? 'No results found for your search.' : 'Your dashboard is empty.'}
                        </p>
                        {searchTerm && (
                            <button onClick={clearSearch} className="mt-4 text-indigo-600 hover:underline font-medium">Clear search</button>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {enquiries.map((enquiry) => (
                                        <motion.div
                                            key={enquiry._id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer group relative overflow-hidden"
                                            onClick={() => handleView(enquiry)}
                                        >
                                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div className="flex justify-between items-start mb-4 pl-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm ${getAvatarColor(enquiry.clientName)}`}>
                                                        {getInitials(enquiry.clientName)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 line-clamp-1 text-lg">{enquiry.clientName}</h3>
                                                        <div className="flex items-center text-xs text-slate-500 mt-1">
                                                            <Calendar size={12} className="mr-1" />
                                                            {new Date(enquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pl-2 mb-4">
                                                <h4 className="text-base font-semibold text-slate-700 mb-2 line-clamp-1 flex items-center">
                                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-500 mr-2 uppercase tracking-wide">Project</span>
                                                    {enquiry.projectName}
                                                </h4>
                                                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{enquiry.description}</p>
                                            </div>

                                            <div className="pl-2 flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                                <div className="flex items-center text-slate-700 font-bold bg-green-50 px-3 py-1 rounded-full text-sm border border-green-100/50">
                                                    <DollarSign size={14} className="mr-1 text-green-600" />
                                                    {enquiry.budget.toLocaleString()}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={(e) => handleDelete(enquiry._id, e)}
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
                                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-200">
                                            {enquiries.map((enquiry) => (
                                                <tr key={enquiry._id} className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => handleView(enquiry)}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${getAvatarColor(enquiry.clientName)}`}>
                                                                {getInitials(enquiry.clientName)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-slate-900">{enquiry.clientName}</div>
                                                                <div className="text-sm text-slate-500">{enquiry.phone}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-slate-900 font-medium">{enquiry.projectName}</div>
                                                        <div className="text-xs text-slate-500 truncate max-w-xs">{enquiry.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-flex items-center">
                                                            <DollarSign size={12} className="mr-1" />
                                                            {enquiry.budget.toLocaleString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button onClick={(e) => handleDelete(enquiry._id, e)} className="text-red-400 hover:text-red-900 mx-2 p-1.5 hover:bg-red-50 rounded-full transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <button className="text-indigo-400 hover:text-indigo-900 mx-2 p-1.5 hover:bg-indigo-50 rounded-full transition-colors">
                                                            <Eye size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {!loading && enquiries.length > 0 && (
                    <div className="mt-10 flex items-center justify-center space-x-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-50 disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-50 disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                <EnquiryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    enquiry={selectedEnquiry}
                />
            </div>
        </div>
    );
};

export default Dashboard;
