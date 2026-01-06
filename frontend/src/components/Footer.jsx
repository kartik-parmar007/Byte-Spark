import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold gradient-text">Portfolio.</span>
            <p className="text-slate-500 text-sm mt-1">
              Building digital experiences that matter.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/kartik-parmar007" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/kartik-parmar-/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Portfolio System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
