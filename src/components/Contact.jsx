import React, { useState } from "react";
import { Mail, Linkedin, Github, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { personalData } from "../config";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    // Simulate proper email send (would usually use EmailJS or a backend)
    // Here we simulate success and then provide a mailto fallback for actual sending
    setTimeout(() => {
      setStatus("success");
      // Fallback to open mail client for "actual" send if needed
      const mailtoLink = `mailto:${personalData.email}?subject=Collaboration Inquiry from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.name} (${formData.email})`;
      window.location.href = mailtoLink;
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect-premium p-8 md:p-16 rounded-[3rem] border border-slate-200 dark:border-white/5 relative overflow-hidden">
          {/* Background Blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]"></div>

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-7xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight leading-tight">
                Let's <br /><span className="text-sky-600 dark:text-sky-400">Collaborate</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-md leading-relaxed font-medium">
                Currently open to new opportunities and specialized frontend consulting. 
                Get in touch for a direct partnership.
              </p>

              <div className="space-y-4">
                <a 
                  href={`mailto:${personalData.email}`}
                  className="group flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl hover:border-sky-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-sm border border-slate-100 dark:border-white/5">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Direct Email</div>
                      <div className="text-slate-900 dark:text-slate-200 font-bold">{personalData.email}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl">
                {status === "success" ? (
                  <div className="text-center py-10 animate-fadeInUp">
                    <CheckCircle2 size={64} className="text-sky-500 dark:text-sky-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Prepared!</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">Opening your email client to complete the send...</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="px-8 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all font-bold"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">Quick Message</h3>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full px-6 py-4 bg-white dark:bg-slate-950/50 border ${errors.name ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl focus:outline-none focus:border-sky-500/50 text-slate-900 dark:text-slate-200 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                          />
                          {errors.name && <p className="text-[10px] text-red-500 dark:text-red-400 px-2 uppercase font-bold">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <input 
                            type="email" 
                            placeholder="Your Email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full px-6 py-4 bg-white dark:bg-slate-950/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl focus:outline-none focus:border-sky-500/50 text-slate-900 dark:text-slate-200 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                          />
                          {errors.email && <p className="text-[10px] text-red-500 dark:text-red-400 px-2 uppercase font-bold">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <textarea 
                          placeholder="Project Details or Message" 
                          rows="4"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className={`w-full px-6 py-4 bg-white dark:bg-slate-950/50 border ${errors.message ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl focus:outline-none focus:border-sky-500/50 text-slate-900 dark:text-slate-200 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                        ></textarea>
                        {errors.message && <p className="text-[10px] text-red-500 dark:text-red-400 px-2 uppercase font-bold">{errors.message}</p>}
                      </div>
                      <button 
                        disabled={status === "sending"}
                        className="w-full py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 border border-slate-900 dark:border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl font-bold flex items-center justify-center gap-2 group disabled:opacity-50 shadow-xl"
                      >
                        {status === "sending" ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900 rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Launch Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
