import { Link } from 'react-router-dom';
import { ArrowRight, Code, Layout, Smartphone, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="flex flex-col w-full overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 text-sm font-medium mb-6 backdrop-blur-sm">
                            Available for Freelance Projects
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                            Crafting Digital <br />
                            <span className="gradient-text">Masterpieces</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            I'm a Senior Full-Stack Developer & UI/UX Designer. I transform complex problems into minimal, elegant, and robust digital solutions.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/contact"
                                className="btn-primary flex items-center group text-lg px-10 py-4"
                            >
                                Hire Me
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/enquiries"
                                className="text-slate-600 font-medium hover:text-indigo-600 transition-colors px-6 py-3 flex items-center"
                            >
                                View Dashboard <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">My Expertise</h2>
                        <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            High-End Solutions for Modern Brands
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Full-Stack Development',
                                desc: 'End-to-end web applications using MERN stack with scalable architecture and clean code.',
                                icon: Code,
                                color: 'bg-blue-50 text-blue-600',
                            },
                            {
                                title: 'UI/UX Design',
                                desc: 'User-centered design principles to create intuitive, accessible, and stunning interfaces.',
                                icon: Layout,
                                color: 'bg-purple-50 text-purple-600',
                            },
                            {
                                title: 'Mobile Optimization',
                                desc: 'Responsive layouts ensuring your product looks flawless on phones, tablets, and desktops.',
                                icon: Smartphone,
                                color: 'bg-pink-50 text-pink-600',
                            },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
