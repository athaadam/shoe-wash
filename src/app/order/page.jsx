'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function OrderPage() {
  const [form, setForm] = useState({
    nama: '',
    whatsapp: "",
    jenis: 'Sport',
    alamat: '',
    paket: 'Quick Wash',
    jumlah: 1,
    catatan: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(''); // Fixed: changed from object to string
  const [errors, setErrors] = useState({}); // Added: separate errors object for field-specific errors
  const [currentStep, setCurrentStep] = useState(1);

  const paketHarga = {
    'Quick Wash': 15000,
    'Deep Clean': 25000,
    'Premium Care': 35000
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Hanya angka untuk WhatsApp
    if (name === "whatsapp") {
        // Cegah input selain angka
        if (!/^\d*$/.test(value)) return;

        // Validasi panjang dan awalan 08
        if (value && (!value.startsWith("08") || value.length < 12 || value.length > 14)) {
            setErrors((prev) => ({
                ...prev,
                whatsapp: "Nomor harus diawali dengan 08 dan 12–14 digit",
            }));
        } else {
            setErrors((prev) => ({ ...prev, whatsapp: null }));
        }
    }

    setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validasi field required
    if (!form.nama.trim()) {
        newErrors.nama = "Nama wajib diisi";
    }

    if (!form.alamat.trim()) {
        newErrors.alamat = "Alamat wajib diisi";
    }

    // Validasi nomor WhatsApp
    if (
        !form.whatsapp ||
        !form.whatsapp.startsWith("08") ||
        form.whatsapp.length < 12 ||
        form.whatsapp.length > 14 ||
        !/^\d+$/.test(form.whatsapp)
    ) {
        newErrors.whatsapp = "Nomor harus diawali dengan 08 dan terdiri dari 12–14 digit angka";
    }

    // Jika ada error, hentikan submit
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setError('Mohon perbaiki kesalahan pada form');
        return;
    }

    // Tidak ada error, lanjutkan submit
    console.log("Form valid, kirim data:", form);
    setSubmitted(true);
    setErrors({});
    setError('');
  };

  const nextStep = () => {
    // Validasi step 1
    if (currentStep === 1) {
        const stepErrors = {};
        
        if (!form.nama.trim()) {
            stepErrors.nama = "Nama wajib diisi";
        }
        
        if (!form.whatsapp || !form.whatsapp.startsWith("08") || form.whatsapp.length < 12) {
            stepErrors.whatsapp = "Nomor WhatsApp harus valid";
        }
        
        if (!form.alamat.trim()) {
            stepErrors.alamat = "Alamat wajib diisi";
        }
        
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            setError('Mohon lengkapi data pribadi terlebih dahulu');
            return;
        }
    }
    
    if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        setError('');
        setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        setError('');
        setErrors({});
    }
  };

  const totalHarga = paketHarga[form.paket] * form.jumlah;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar />

      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🧽</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pesan Layanan Cuci Sepatu</h1>
            <p className="text-gray-600 text-lg">Sepatu bersih dalam 24 jam dengan layanan terpercaya</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 transition-all ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-sm text-gray-600 mb-8">
            <div className="flex space-x-8">
              <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Data Pribadi</span>
              <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Pilih Layanan</span>
              <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Konfirmasi</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-6">🎉</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-4">Pemesanan Berhasil!</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <p className="text-green-800 mb-4">
                        Terima kasih <strong>{form.nama}</strong>! Pesanan Anda telah kami terima.
                      </p>
                      <div className="text-left space-y-2 text-sm text-green-700">
                        <p>📱 Kami akan menghubungi Anda di: <strong>{form.whatsapp}</strong></p>
                        <p>🚚 Penjemputan di: <strong>{form.alamat}</strong></p>
                        <p>👟 Jenis sepatu: <strong>{form.jenis}</strong></p>
                        <p>📦 Paket: <strong>{form.paket}</strong></p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button 
                        onClick={() => {
                          setSubmitted(false);
                          setCurrentStep(1);
                          setForm({
                            nama: '', whatsapp: '', jenis: 'Sport', alamat: '', 
                            paket: 'Quick Wash', jumlah: 1, catatan: ''
                          });
                          setErrors({});
                          setError('');
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                      >
                        Pesan Lagi
                      </button>
                      <p className="text-gray-600 text-sm">
                        Estimasi penjemputan: <strong>2-4 jam setelah konfirmasi</strong>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                      </div>
                    )}

                    {/* Step 1: Data Pribadi */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Data Pribadi</h3>
                          <p className="text-gray-600">Masukkan informasi kontak Anda</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Nama Lengkap *
                            </label>
                            <input
                              type="text"
                              name="nama"
                              value={form.nama}
                              onChange={handleChange}
                              placeholder="Contoh: John Doe"
                              className={`text-black w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                errors.nama ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.nama && (
                              <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Nomor WhatsApp *
                            </label>
                            <input
                              type="text"
                              name="whatsapp"
                              value={form.whatsapp}
                              onChange={handleChange}
                              placeholder="08123456789"
                              className={`text-black w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.whatsapp && (
                              <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Alamat Penjemputan *
                          </label>
                          <textarea
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            placeholder="Masukkan alamat lengkap dengan patokan..."
                            rows="4"
                            className={`text-black w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                              errors.alamat ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.alamat && (
                            <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            💡 Semakin detail alamat, semakin mudah kami menjemput
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Pilih Layanan */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Pilih Layanan</h3>
                          <p className="text-gray-600">Tentukan jenis sepatu dan paket layanan</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Jenis Sepatu
                            </label>
                            <select
                              name="jenis"
                              value={form.jenis}
                              onChange={handleChange}
                              className="text-black w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                              <option value="Sport">👟 Sport / Sneakers</option>
                              <option value="Casual">👞 Casual</option>
                              <option value="Boots">🥾 Boots</option>
                              <option value="Formal">👔 Formal</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Jumlah Pasang
                            </label>
                            <input
                              type="number"
                              name="jumlah"
                              value={form.jumlah}
                              onChange={handleChange}
                              min="1"
                              max="10"
                              className="text-black w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-4">
                            Pilih Paket Layanan
                          </label>
                          <div className="grid gap-4">
                            {Object.entries(paketHarga).map(([paket, harga]) => (
                              <label key={paket} className="relative">
                                <input
                                  type="radio"
                                  name="paket"
                                  value={paket}
                                  checked={form.paket === paket}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                  form.paket === paket 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-semibold text-gray-800">{paket}</h4>
                                      <p className="text-sm text-gray-600">
                                        {paket === 'Quick Wash' && 'Pembersihan cepat & praktis'}
                                        {paket === 'Deep Clean' && 'Pembersihan mendalam & menyeluruh'}
                                        {paket === 'Premium Care' && 'Perawatan premium + proteksi'}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xl font-bold text-blue-600">
                                        Rp {harga.toLocaleString('id-ID')}
                                      </div>
                                      <div className="text-xs text-gray-500">per pasang</div>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Catatan Tambahan (Opsional)
                          </label>
                          <textarea
                            name="catatan"
                            value={form.catatan}
                            onChange={handleChange}
                            placeholder="Contoh: Ada noda membandel di bagian depan..."
                            rows="3"
                            className="text-black w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Konfirmasi */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Konfirmasi Pesanan</h3>
                          <p className="text-gray-600">Periksa kembali detail pesanan Anda</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Nama:</span>
                              <p className="font-semibold">{form.nama}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">WhatsApp:</span>
                              <p className="font-semibold">{form.whatsapp}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Jenis Sepatu:</span>
                              <p className="font-semibold">{form.jenis}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Jumlah:</span>
                              <p className="font-semibold">{form.jumlah} pasang</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <span className="text-gray-600 text-sm">Alamat Penjemputan:</span>
                            <p className="font-semibold">{form.alamat}</p>
                          </div>

                          {form.catatan && (
                            <div className="border-t pt-4">
                              <span className="text-gray-600 text-sm">Catatan:</span>
                              <p className="font-medium">{form.catatan}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                        >
                          ← Sebelumnya
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold"
                        >
                          Selanjutnya →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-semibold"
                        >
                          🚀 Konfirmasi Pesanan
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              {!submitted && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📋 Ringkasan Pesanan</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black font-bold">Paket Layanan:</span>
                      <span className="text-black">{form.paket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black font-bold">Harga Per Pasang:</span>
                      <span className="text-black">Rp {paketHarga[form.paket].toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black font-bold">Jumlah:</span>
                      <span className="text-black">{form.jumlah} pasang</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg">
                      <span className="font-bold text-gray-800">Total:</span>
                      <span className="font-bold text-blue-600">Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Gratis:</strong> Pickup & Delivery dalam radius 5km
                    </p>
                  </div>
                </div>
              )}

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">✅</span>
                    <h5 className="font-bold">Garansi 100%</h5>
                  </div>
                  <p className="text-sm opacity-90">Jaminan sepatu bersih atau uang kembali</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">⚡</span>
                    <h5 className="font-bold">Express Service</h5>
                  </div>
                  <p className="text-sm opacity-90">Layanan kilat 6 jam (premium only)</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📱</span>
                    <h5 className="font-bold">Live Tracking</h5>
                  </div>
                  <p className="text-sm opacity-90">Pantau progress cucian via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}