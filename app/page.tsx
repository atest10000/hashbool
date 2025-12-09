'use client';

import { useState } from 'react';

export default function Soon() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Submitting form with data:', formData);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', { status: response.status, data });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        console.error('API Error:', data.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#56a5de' }} dir="rtl">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full space-y-10">
          {/* Coming Soon Section */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
              قريباً
            </h1>
            <p className="text-xl text-white/90 font-medium">
              نحن نعمل على شيء رائع. ترقبوا!
            </p>
          </div>

          {/* Contact Form - New Modern Design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/30">
              {/* Form Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  تواصل معنا
                </h2>
                <p className="text-gray-600 text-sm">
                  سنكون سعداء للرد على استفساراتك
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2.5"
                  >
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2.5"
                  >
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Phone Field (Optional) */}
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2.5"
                  >
                    الهاتف <span className="text-gray-400 text-xs font-normal">(اختياري)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2.5"
                  >
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري الإرسال...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        إرسال الرسالة
                      </span>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 px-5 py-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-green-800 font-semibold">تم الإرسال بنجاح!</p>
                      <p className="text-green-700 text-sm mt-1">شكراً لك! تم إرسال رسالتك وسنرد عليك قريباً.</p>
                    </div>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 px-5 py-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-red-800 font-semibold">حدث خطأ</p>
                      <p className="text-red-700 text-sm mt-1">عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
