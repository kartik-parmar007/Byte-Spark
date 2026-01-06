import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Send, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        clientName: '',
        projectName: '',
        phone: '',
        description: '',
        budget: '',
        links: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { clientName, projectName, phone, description, budget } = formData;
        if (!clientName || !projectName || !description || !budget) {
            toast.error('Please fill in all required fields');
            return false;
        }
        if (!/^\d{10,}$/.test(phone)) {
            toast.error('Please enter a valid phone number (at least 10 digits)');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const processedLinks = formData.links
                ? formData.links.split(/[\n,]/).map(l => l.trim()).filter(l => l)
                : [];

            const payload = {
                ...formData,
                links: processedLinks,
                budget: Number(formData.budget),
            };

            await api.post('/enquiries', payload);
            toast.success('Enquiry submitted successfully!');
            setFormData({
                clientName: '',
                projectName: '',
                phone: '',
                description: '',
                budget: '',
                links: '',
            });
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Failed to submit enquiry';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-100 rounded-bl-full mix-blend-multiply opacity-50 filter blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100 rounded-tr-full mix-blend-multiply opacity-50 filter blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">

                {/* Info Section */}
                <div className="lg:pr-8 pt-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Let's Discuss Your <span className="gradient-text">Next Big Idea</span></h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            I'm excited to hear about your project. Fill out the form, and I'll get back to you with a proposal within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600">
                                        <Mail size={20} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-slate-900">Email</h3>
                                    <p className="mt-1 text-slate-600">kartikparmar9773@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600">
                                        <Phone size={20} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-slate-900">Phone</h3>
                                    <p className="mt-1 text-slate-600">+91 9773405142</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600">
                                        <MapPin size={20} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-slate-900">Location</h3>
                                    <p className="mt-1 text-slate-600">Remote / Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/40"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '20px' }}>
                            <div>
                                <label htmlFor="clientName" className="block text-sm font-semibold text-slate-700 mb-2">Client Name</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    id="clientName"
                                    required
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="projectName" className="block text-sm font-semibold text-slate-700 mb-2">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    required
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="E-commerce App"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '20px' }}>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-2">Budget (USD)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    required
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="5000"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">Project Details</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="input-field resize-none"
                                placeholder="Describe your project requirements, goals, and timeline..."
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="links" className="block text-sm font-semibold text-slate-700 mb-2">Relevant Links (Optional)</label>
                            <textarea
                                id="links"
                                name="links"
                                rows={2}
                                value={formData.links}
                                onChange={handleChange}
                                className="input-field resize-none"
                                placeholder="https://example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex justify-center items-center text-lg mt-4 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            ) : (
                                <Send className="h-5 w-5 mr-2" />
                            )}
                            {loading ? 'Sending...' : 'Send Enquiry'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
