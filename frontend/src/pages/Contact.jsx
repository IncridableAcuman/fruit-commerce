import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Ism kiritilishi shart';
    if (!form.email.trim()) e.email = 'Email kiritilishi shart';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Yaroqsiz email';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setSending(true);
    setSent(false);

    try {
      // TODO: replace with real API call
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      await new Promise(res => setTimeout(res, 900)); // demo delay
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      // handle error
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <Navbar/>
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto p-6 md:p-10 mt-10"
      aria-labelledby="contact-heading"
    >
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-10">
          {/* Left: Info + Map */}
          <div className="space-y-6">
            <div>
              <h2 id="contact-heading" className="text-2xl md:text-3xl font-semibold">Biz bilan bog'laning</h2>
              <p className="text-muted-foreground mt-2">Savollar, hamkorlik yoki yordam — xohlagan vaqtingizda yozing. Tez orada javob beramiz.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm">Email</p>
                  <a href="mailto:hello@example.com" className="font-medium">hello@example.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm">Telefon</p>
                  <a href="tel:+998901234567" className="font-medium">+998 90 123 45 67</a>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border">
              {/* Map placeholder - o'zgartirish uchun haqiqiy embeddable map kiriting */}
              <div className="w-full h-56 md:h-48 lg:h-64 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-sm text-gray-500">
                  <MapPin className="mx-auto mb-2 w-6 h-6" />
                  Xarita (placeholder) — bu joyga Google Maps yoki boshqa xarita component'ini joylashtiring
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">Ijtimoiy tarmoqlar: <span className="font-medium">@company</span></div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Ism</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`mt-2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
                    placeholder="Ismingiz"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <span id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</span>}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`mt-2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                    placeholder="name@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</span>}
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Mavzu (ixtiyoriy)</span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Mavzu"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Xabar</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={`mt-2 px-4 py-3 rounded-lg border h-32 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.message ? 'border-red-300' : 'border-gray-200'}`}
                  placeholder="Xabaringizni yozing..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span id="message-error" className="text-red-600 text-sm mt-1">{errors.message}</span>}
              </label>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Yuborilmoqda...' : 'Yuborish'}
                </button>

                {sent && (
                  <div className="text-sm text-green-600">Xabaringiz muvaffaqiyatli yuborildi. Rahmat!</div>
                )}

                {!sent && !sending && (
                  <div className="text-sm text-gray-500">Yoki telefon orqali bog'laning: <span className="font-medium">+998 90 123 45 67</span></div>
                )}
              </div>

              <p className="text-xs text-gray-400">Biz sizning ma'lumotlaringizni hech qachon uchinchi tomon bilan bo'lishmaymiz. By submitting, you agree to our terms.</p>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
    <Footer/>
    </>
    
  );
}
