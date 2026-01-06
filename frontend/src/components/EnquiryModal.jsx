import { X, ExternalLink, Calendar, DollarSign, Phone, User, FileText, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnquiryModal = ({ isOpen, onClose, enquiry }) => {
    // We use the AnimatePresence in the return, but for exit animations to work 
    // with the current parent structure (which passes isOpen), we should really 
    // rely on the parent conditionally rendering. 
    // HOWEVER, since the parent renders <EnquiryModal /> always and just toggles props,
    // we can use AnimatePresence internally if we remove the early return.

    return (
        <AnimatePresence>
            {isOpen && enquiry && (
                <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                            aria-hidden="true"
                            onClick={onClose}
                        ></motion.div>

                        {/* Centering spacer for desktop */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        {/* Modal Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-slate-100"
                        >
                            {/* Header */}
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-xl font-bold text-slate-800" id="modal-title">
                                    Project Details
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shadow-sm border border-slate-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6 space-y-6">

                                {/* Client & Budget Row */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Client</p>
                                            <p className="text-sm font-bold text-slate-900">{enquiry.clientName}</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <DollarSign size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Budget</p>
                                            <p className="text-sm font-bold text-slate-900">${enquiry.budget.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Name & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center space-x-2 text-slate-500 mb-1">
                                            <FileText size={16} />
                                            <span className="text-sm font-medium">Project Name</span>
                                        </div>
                                        <p className="text-base font-semibold text-slate-900 pl-6 border-l-2 border-indigo-500">{enquiry.projectName}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 text-slate-500 mb-1">
                                            <Phone size={16} />
                                            <span className="text-sm font-medium">Phone Number</span>
                                        </div>
                                        <p className="text-base font-medium text-slate-900 font-mono">{enquiry.phone}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <div className="flex items-center space-x-2 text-slate-500 mb-2">
                                        <FileText size={16} />
                                        <span className="text-sm font-medium">Description</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl text-slate-700 text-sm leading-relaxed border border-slate-100 max-h-60 overflow-y-auto w-full break-words">
                                        {enquiry.description}
                                    </div>
                                </div>

                                {/* Links */}
                                {enquiry.links && enquiry.links.length > 0 && typeof enquiry.links !== 'string' && (
                                    <div>
                                        <div className="flex items-center space-x-2 text-slate-500 mb-2">
                                            <LinkIcon size={16} />
                                            <span className="text-sm font-medium">Relevant Links</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {enquiry.links.map((link, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={link.startsWith('http') ? link : `https://${link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center p-3 bg-indigo-50 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors group"
                                                    >
                                                        <ExternalLink size={16} className="mr-2 flex-shrink-0" />
                                                        <span className="text-sm font-medium truncate group-hover:underline">{link}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end text-xs text-slate-400">
                                    <Calendar size={12} className="mr-1" />
                                    Submitted on {new Date(enquiry.createdAt).toLocaleString()}
                                </div>

                            </div>

                            {/* Footer Actions */}
                            <div className="bg-slate-50 px-6 py-4 flex justify-end">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>

                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EnquiryModal;
