'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data
  const mockTrackingData = {
    '08123456789': {
      orderId: 'CS-2024-001',
      customerName: 'John Doe',
      shoeType: 'Sport Sneakers',
      package: 'Deep Clean',
      orderDate: '2024-08-01',
      estimatedCompletion: '2024-08-03',
      currentStatus: 'washing',
      progress: 60,
      timeline: [
        { stage: 'ordered', label: 'Pesanan Diterima', time: '01 Aug 2024, 10:00', completed: true },
        { stage: 'pickup', label: 'Sepatu Dijemput', time: '01 Aug 2024, 14:30', completed: true },
        { stage: 'washing', label: 'Proses Pencucian', time: '02 Aug 2024, 09:00', completed: true, current: true },
        { stage: 'drying', label: 'Pengeringan', time: 'Estimasi: 02 Aug 2024, 16:00', completed: false },
        { stage: 'quality', label: 'Quality Check', time: 'Estimasi: 03 Aug 2024, 09:00', completed: false },
        { stage: 'delivery', label: 'Siap Diantar', time: 'Estimasi: 03 Aug 2024, 14:00', completed: false }
      ]
    },
    'CS-2024-002': {
      orderId: 'CS-2024-002',
      customerName: 'Sarah Johnson',
      shoeType: 'Casual Boots',
      package: 'Premium Care',
      orderDate: '2024-07-30',
      estimatedCompletion: '2024-08-02',
      currentStatus: 'delivery',
      progress: 100,
      timeline: [
        { stage: 'ordered', label: 'Pesanan Diterima', time: '30 Jul 2024, 15:20', completed: true },
        { stage: 'pickup', label: 'Sepatu Dijemput', time: '30 Jul 2024, 18:00', completed: true },
        { stage: 'washing', label: 'Proses Pencucian', time: '31 Jul 2024, 10:00', completed: true },
        { stage: 'drying', label: 'Pengeringan', time: '31 Jul 2024, 16:00', completed: true },
        { stage: 'quality', label: 'Quality Check', time: '01 Aug 2024, 11:00', completed: true },
        { stage: 'delivery', label: 'Siap Diantar', time: '02 Aug 2024, 09:00', completed: true, current: true }
      ]
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!trackingId.trim()) {
      setError('Mohon masukkan nomor pemesanan atau WhatsApp');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingId.trim()];
      if (result) {
        setTrackingResult(result);
        setError('');
      } else {
        setTrackingResult(null);
        setError('Data tidak ditemukan. Periksa kembali nomor pemesanan atau WhatsApp Anda.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    const colors = {
      ordered: 'bg-blue-500',
      pickup: 'bg-yellow-500',
      washing: 'bg-purple-500',
      drying: 'bg-orange-500',
      quality: 'bg-indigo-500',
      delivery: 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      ordered: 'Pesanan Diterima',
      pickup: 'Dijemput',
      washing: 'Sedang Dicuci',
      drying: 'Pengeringan',
      quality: 'Quality Check',
      delivery: 'Siap Diantar'
    };
    return texts[status] || 'Unknown';
  };

  const getStatusIcon = (stage) => {
    const icons = {
      ordered: '📋',
      pickup: '🚚',
      washing: '🧽',
      drying: '💨',
      quality: '🔍',
      delivery: '✅'
    };
    return icons[stage] || '📦';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar />

      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Lacak Status Cucian</h1>
            <p className="text-gray-600 text-lg">Pantau progress pencucian sepatu Anda secara real-time</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🔍 Nomor Pemesanan atau WhatsApp
                  </label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Contoh: CS-2024-001 atau 08123456789"
                    className="text-gray-500 w-full p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Masukkan nomor pemesanan yang dikirim via WhatsApp atau nomor HP Anda
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Mencari Data...
                    </span>
                  ) : (
                    '🔍 Cek Status Sekarang'
                  )}
                </button>
              </div>

              {/* Quick Access Examples */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">Coba contoh data:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setTrackingId('08123456789')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition"
                  >
                    08123456789
                  </button>
                  <button
                    onClick={() => setTrackingId('CS-2024-002')}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition"
                  >
                    CS-2024-002
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">📦 Detail Pesanan</h3>
                  <div className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(trackingResult.currentStatus)}`}>
                    {getStatusText(trackingResult.currentStatus)}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-600">ID Pesanan</span>
                      <p className="font-semibold text-lg">{trackingResult.orderId}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Nama Customer</span>
                      <p className="font-semibold">{trackingResult.customerName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Jenis Sepatu</span>
                      <p className="font-semibold">{trackingResult.shoeType}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-600">Paket Layanan</span>
                      <p className="font-semibold">{trackingResult.package}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Tanggal Pesan</span>
                      <p className="font-semibold">{trackingResult.orderDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Estimasi Selesai</span>
                      <p className="font-semibold text-blue-600">{trackingResult.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress Pencucian</span>
                    <span className="text-sm font-bold text-blue-600">{trackingResult.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">🕐 Timeline Progress</h3>
                
                <div className="relative">
                  {trackingResult.timeline.map((item, index) => (
                    <div key={index} className="flex items-start mb-8 last:mb-0 relative">
                      {/* Timeline Line */}
                      {index < trackingResult.timeline.length - 1 && (
                        <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                          item.completed ? 'bg-blue-500' : 'bg-gray-200'
                        }`} />
                      )}
                      
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl relative z-10 ${
                        item.completed 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      } ${item.current ? 'ring-4 ring-blue-200 animate-pulse' : ''}`}>
                        {getStatusIcon(item.stage)}
                      </div>
                      
                      {/* Content */}
                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-lg ${
                            item.completed ? 'text-gray-800' : 'text-gray-500'
                          } ${item.current ? 'text-blue-600' : ''}`}>
                            {item.label}
                            {item.current && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                Sedang Berlangsung
                              </span>
                            )}
                          </h4>
                          <span className={`text-sm ${
                            item.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {item.time}
                          </span>
                        </div>
                        
                        {item.current && (
                          <p className="text-sm text-blue-600 mt-1 font-medium">
                            ⚡ Proses ini sedang dikerjakan oleh tim kami
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Contact */}
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-green-800">📱 Butuh Bantuan?</h5>
                      <p className="text-sm text-green-700">
                        Hubungi customer service kami via WhatsApp untuk update lebih detail
                      </p>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold">
                      Chat WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h5 className="font-bold mb-1">Garansi Bersih</h5>
                  <p className="text-sm opacity-90">100% uang kembali jika tidak puas</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h5 className="font-bold mb-1">Layanan Cepat</h5>
                  <p className="text-sm opacity-90">Estimasi pengerjaan 24-48 jam</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
                  <div className="text-3xl mb-2">🚚</div>
                  <h5 className="font-bold mb-1">Free Delivery</h5>
                  <p className="text-sm opacity-90">Gratis antar dalam radius 5km</p>
                </div>
              </div>
            </div>
          )}

          {/* How to Track Guide (shown only when no result) */}
          {!trackingResult && !isLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📚 Cara Melacak Pesanan
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Cek WhatsApp</h4>
                  <p className="text-sm text-gray-600">
                    Nomor pemesanan dikirim via WhatsApp setelah sepatu dijemput
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Masukkan Nomor</h4>
                  <p className="text-sm text-gray-600">
                    Input nomor pemesanan atau nomor WhatsApp di form di atas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Lihat Progress</h4>
                  <p className="text-sm text-gray-600">
                    Pantau real-time status pencucian sepatu Anda
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}