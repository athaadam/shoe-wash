"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from "react";
import { Clock, Shield, MapPin, Star } from "lucide-react";

export default function AboutPage() {
  const testimonials = [
    {
      image: "👟",
      quote: "Sepatu saya kinclong banget! Pelayanannya cepat dan ramah.",
      name: "Andi Saputra",
      role: "Mahasiswa"
    },
    {
      image: "🧼",
      quote: "Sudah 3x pakai CleanKicks, selalu puas. Highly recommended!",
      name: "Dina Pramesti",
      role: "Ibu Rumah Tangga"
    },
    {
      image: "💼",
      quote: "Sebagai karyawan, saya suka layanan express-nya. Sepatu bersih tanpa ribet.",
      name: "Rico Wijaya",
      role: "Karyawan Swasta"
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <>
        <Navbar />
      {/* Section: Kenapa Pilih CleanKicks? */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Kenapa Pilih <span className="text-blue-600">CleanKicks?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Clock className="w-12 h-12 text-blue-600" />, 
                title: "Cepat & Efisien", 
                desc: "Sepatu bersih hanya dalam 24 jam! Bahkan bisa express dalam 6 jam.",
              },
              { 
                icon: <Shield className="w-12 h-12 text-green-600" />, 
                title: "Bahan Aman", 
                desc: "Bahan pembersih premium & ramah lingkungan. Aman untuk semua material.",
              },
              { 
                icon: <MapPin className="w-12 h-12 text-purple-600" />, 
                title: "Pelacakan Mudah", 
                desc: "Tracking cucianmu secara real-time via WhatsApp. Transparan 100%! ",
              },
            ].map((item, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"
                  style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                <div className="relative z-10">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Testimoni Pelanggan */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Apa Kata Pelanggan? 💬</h2>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-6xl mb-4">{testimonials[currentTestimonial].image}</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < testimonials[currentTestimonial].rating || 5 ? 'text-yellow-400 fill-current' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="text-xl italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div>
                <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-blue-200">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
