'use client'

import { useState } from 'react'
import { Trash2, Edit3, Plus, Receipt, Phone, User, DollarSign, Search, Filter } from 'lucide-react'

export default function AdminPage() {
  const [invoices, setInvoices] = useState([])
  const [form, setForm] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  const services = [
    'Quick Wash',
    'Deep Clean',
    'Premium Care',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.service || !form.price) return

    if (editingId !== null) {
      setInvoices(
        invoices.map(inv => inv.id === editingId ? { 
          ...form, 
          id: editingId,
          updatedAt: new Date().toISOString()
        } : inv)
      )
      setEditingId(null)
    } else {
      const newInvoice = {
        id: Date.now(),
        name: form.name,
        phone: form.phone,
        service: form.service,
        price: form.price,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      setInvoices([...invoices, newInvoice])
    }
    setForm({})
    setShowForm(false)
  }

  const handleEdit = (id) => {
    const invoice = invoices.find(inv => inv.id === id)
    if (invoice) {
      setForm(invoice)
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus invoice ini?')) {
      setInvoices(invoices.filter(inv => inv.id !== id))
    }
  }

  const toggleStatus = (id) => {
    setInvoices(invoices.map(inv => 
      inv.id === id 
        ? { ...inv, status: inv.status === 'pending' ? 'completed' : 'pending' }
        : inv
    ))
  }

  const resetForm = () => {
    setForm({})
    setEditingId(null)
    setShowForm(false)
  }

  const filteredInvoices = invoices.filter(inv =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.phone.includes(searchTerm) ||
    inv.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = invoices
    .filter(inv => inv.status === 'completed')
    .reduce((sum, inv) => sum + inv.price, 0)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Receipt className="text-blue-600" />
            Dashboard Admin Invoice
          </h1>
          <p className="text-gray-600">Kelola invoice layanan cuci kendaraan Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoice</p>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-green-600">
                  {invoices.filter(inv => inv.status === 'completed').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, phone, atau layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Buat Invoice Baru
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId !== null ? 'Edit Invoice' : 'Buat Invoice Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Pelanggan"
                  value={form.name || ''}
                  onChange={handleChange}
                  className="text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="phone"
                  placeholder="No. WhatsApp"
                  value={form.phone || ''}
                  onChange={handleChange}
                  className="w-full text-black pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                name="service"
                value={form.service || ''}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Pilih Jenis Layanan</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  placeholder="Harga (Rp)"
                  value={form.price || ''}
                  onChange={handleChange}
                  className="text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {editingId !== null ? 'Update Invoice' : 'Buat Invoice'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Invoice List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Daftar Invoice ({filteredInvoices.length})
            </h2>
          </div>
          
          {filteredInvoices.length === 0 ? (
            <div className="p-12 text-center">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'Tidak ada invoice yang sesuai pencarian' : 'Belum ada invoice'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredInvoices.map(inv => (
                <div key={inv.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{inv.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inv.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {inv.status === 'completed' ? 'Selesai' : 'Pending'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {inv.phone}
                        </div>
                        <div>{inv.service}</div>
                        <div className="font-semibold text-green-600">
                          Rp {inv.price.toLocaleString()}
                        </div>
                      </div>
                      {inv.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          Dibuat: {formatDate(inv.createdAt)}
                          {inv.updatedAt && ` • Diupdate: ${formatDate(inv.updatedAt)}`}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleStatus(inv.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          inv.status === 'completed'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {inv.status === 'completed' ? 'Batalkan' : 'Selesai'}
                      </button>
                      <button
                        onClick={() => handleEdit(inv.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}