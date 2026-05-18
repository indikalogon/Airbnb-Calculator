import React, { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(""); // Clear previous results

    const formData = new FormData(event.target);
    // ඔබගේ Web3Forms Access Key එක
    formData.append("access_key", "19bb3ddc-0188-48aa-890d-d6977b500ff9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Success");
        event.target.reset(); // යැවූ පසු Form එක හිස් කිරීම
      } else {
        setResult("Error");
      }
    } catch (error) {
      setResult("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>Contact Support | Rentcalo</title>
        <meta name="description" content="Contact Rentcalo support for questions about our short-term rental calculators, platform fee updates, or to suggest new features." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="canonical" href="https://www.rentcalo.com/contact" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">Contact Support</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We are here to help you optimize your short-term rental business. Whether you have a question about our calculators, spotted an outdated tax rate, or want to suggest a new feature, we would love to hear from you.
          </p>
          
          {/* Custom Success Message */}
          {result === "Success" && (
            <div className="mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center shadow-sm animate-fade-in-down">
              <i className="fa-solid fa-circle-check text-green-500 text-2xl mr-4"></i>
              <div>
                <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
                <p className="text-sm">Thank you for reaching out. Our support team will get back to you within 24-48 hours.</p>
              </div>
            </div>
          )}

          {/* Custom Error Message */}
          {result === "Error" && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center shadow-sm animate-fade-in-down">
              <i className="fa-solid fa-circle-exclamation text-red-500 text-2xl mr-4"></i>
              <div>
                <h3 className="font-bold text-lg">Oops! Something went wrong.</h3>
                <p className="text-sm">We couldn't send your message. Please try again later or email us directly.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Side: Contact Information */}
            <div className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Get in Touch</h2>
                <p className="mb-2 text-gray-700">
                  <strong>Email:</strong> <a href="mailto:support@rentcalo.com" className="text-blue-600 hover:underline">support@rentcalo.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We are human! Our team aims to respond to all technical queries and feedback within 24–48 business hours.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Feedback & Suggestions</h2>
                <p className="text-gray-700 leading-relaxed">
                  Did platforms like Vrbo or Booking.com recently change their commission structures in your region? Let us know! We rely on our global community of hosts and investors to keep our mathematical models the most accurate on the internet.
                </p>
              </div>
            </div>

            {/* Right Side: Web3Forms React Form */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Security Feature to prevent spam */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" 
                    placeholder="John Doe" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" 
                    placeholder="john@example.com" 
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white resize-none" 
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center transform hover:-translate-y-0.5 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting ? (
                    <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Sending...</>
                  ) : (
                    <><i className="fa-solid fa-paper-plane mr-2"></i> Send Message</>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}