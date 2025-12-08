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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100" dir="rtl">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full space-y-12">
          {/* Coming Soon Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
              قريباً
            </h1>
            <p className="text-xl text-zinc-600">
              نحن نعمل على شيء رائع. ترقبوا!
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg sm:p-10">
            <h2 className="mb-6 text-2xl font-semibold text-black">
              تواصل معنا
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  الاسم <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="اسمك"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="بريدك@example.com"
                />
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  الهاتف <span className="text-zinc-400 text-xs">(اختياري)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="+966 50 123 4567"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  الرسالة <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="رسالتك..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-black px-6 py-3 text-white font-medium transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-800">
                  شكراً لك! تم إرسال رسالتك بنجاح.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-800">
                  عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
