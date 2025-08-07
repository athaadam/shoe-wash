'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Star, Clock, Shield, MapPin, Phone, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';


export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const testimonials = [
    {
      quote: "Sepatuku jadi seperti baru lagi! Servis cepat dan staff ramah banget.",
      name: "Rina",
      role: "Mahasiswa",
      rating: 5,
      image: "👩‍🎓"
    },
    {
      quote: "Pelacakan real-time-nya keren. Jadi tenang nunggu sepatu bersih!",
      name: "Budi", 
      role: "Karyawan",
      rating: 5,
      image: "👨‍💼"
    },
    {
      quote: "Harga terjangkau, hasil memuaskan. Udah langganan 6 bulan!",
      name: "Sarah",
      role: "Ibu Rumah Tangga", 
      rating: 5,
      image: "👩‍🍳"
    }
  ];

  const services = [
    { name: "Deep Clean", price: "25K", popular: false },
    { name: "Premium Care", price: "35K", popular: true },
    { name: "Quick Wash", price: "15K", popular: false }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleIntersection = (id) => {
    setIsVisible(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.8), rgba(59, 130, 246, 0.6)), url("/bg-shoes.png")',
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-bounce mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Cuci Sepatu
            <span className="block text-yellow-300">Bersih Kilat ⚡</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Solusi cepat dan aman untuk sepatu kesayanganmu. 
            <span className="font-semibold text-white">Garansi 100% bersih!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <span className="flex items-center">
                Mulai Cuci Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Lihat Harga
            </button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>24 Jam Selesai</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Garansi Bersih</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Free Pickup</span>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-yellow-300/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-8 w-8 h-8 bg-white/15 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Sepatu Dibersihkan", icon: "👟" },
              { number: "24h", label: "Waktu Pengerjaan", icon: "⏰" },
              { number: "99%", label: "Tingkat Kepuasan", icon: "😊" },
              { number: "5★", label: "Rating Google", icon: "⭐" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Paket Layanan Kami</h2>
            <p className="text-xl text-gray-600">Pilih paket yang sesuai dengan kebutuhanmu</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${service.popular ? 'ring-4 ring-blue-500 scale-105' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      🔥 TERPOPULER
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.name}</h3>
                  <div className="text-5xl font-bold text-blue-600 mb-6">
                    {service.price}
                    <span className="text-lg text-gray-500">/pasang</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {['Deep cleaning', 'Deodorizing', 'Protection spray', service.popular ? 'Express service' : 'Standard service'].map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                  href="/order"
                  className={`block text-center w-full py-3 rounded-full font-bold transition-all duration-300 ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  Pilih Paket
                </a>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-5xl font-bold mb-6">
            Yuk, Rawat Sepatumu Sekarang!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Pesan layanan cuci sepatu profesional hanya dengan beberapa klik. 
            <span className="font-bold">Gratis pickup & delivery!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:scale-105">
              <span className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Pesan via WhatsApp
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <a
              href="https://www.google.com/maps/search/CleanKicks"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Lihat Lokasi Terdekat
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">FREE</div>
              <div className="text-sm">Pickup & Delivery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Customer Service</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Garansi Bersih</div>
            </div>
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/5 rounded-full animate-bounce" />
      </section>
      <Footer/>
    </div>
  );
}