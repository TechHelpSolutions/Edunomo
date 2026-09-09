import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Hotel, PlusCircle, MapPin, Building2, BedDouble, Check,
  Sparkles, CheckCircle2, Eye, Edit2
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { HotelProperty, HotelRoomType } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const HotelProperties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [properties, setProperties] = useState<HotelProperty[]>(partnerService.getHotelProperties());
  const [isAddModalOpen, setIsAddModalOpen] = useState(searchParams.get('action') === 'new');
  const [viewingProperty, setViewingProperty] = useState<HotelProperty | null>(null);

  // Form State for Add Property
  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState<'Student Residence' | 'Hostel' | 'Hotel' | 'Apartment'>('Student Residence');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('London');
  const [country, setCountry] = useState('United Kingdom');
  const [nearbyCampus, setNearbyCampus] = useState('');
  const [distanceToCampus, setDistanceToCampus] = useState('10 min transit');
  const [description, setDescription] = useState('');
  const [startingRate, setStartingRate] = useState('650');
  const [currency, setCurrency] = useState('GBP');

  const resetForm = () => {
    setName('');
    setAddress('');
    setNearbyCampus('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    partnerService.addProperty({
      name,
      propertyType,
      address,
      city,
      country,
      description: description || 'Premium student accommodation equipped with 1Gbps high-speed Wi-Fi, 24/7 security, and study lounge.',
      nearbyCampus: nearbyCampus || 'City University / Metro Station',
      distanceToCampus,
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
      ],
      amenities: ['1 Gbps Wi-Fi', '24/7 Concierge', 'Study Pods', 'Fitness Gym', 'All Bills Included'],
      policies: ['Student ID required at check-in', 'Quiet study hours 11 PM – 7 AM'],
      roomTypes: [
        {
          id: `room-${Date.now()}-1`,
          name: 'Private Studio Flat',
          capacity: 1,
          pricePerMonth: parseInt(startingRate) || 850,
          priceFormatted: `${currency === 'GBP' ? '£' : currency + ' '}${startingRate} / month`,
          currency,
          amenities: ['En-Suite Bathroom', 'Private Kitchenette', 'Desk'],
          availableRooms: 6,
          totalRooms: 30,
          status: 'Available',
        },
      ],
      startingRate: parseInt(startingRate) || 650,
      currency,
    });

    setProperties(partnerService.getHotelProperties());
    showToast('New property published to Edunomo Student Living network!', 'success');
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Accommodations & Living Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage student residence buildings, studio configurations, and room allocations
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add Property
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img src={prop.images[0]} alt={prop.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs">
                  {prop.propertyType}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  {prop.status}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold drop-shadow-sm truncate">{prop.name}</h3>
                  <p className="text-xs text-slate-200 drop-shadow-sm">{prop.address}, {prop.city}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{prop.description}</p>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Nearby Campus</span>
                    <span className="font-semibold text-slate-800 block truncate max-w-[200px]">{prop.nearbyCampus}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Rates</span>
                    <span className="font-bold text-emerald-800 block">{prop.featuredRateFormatted}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Available Room Configurations ({prop.roomTypes.length})
                  </span>
                  <div className="space-y-1">
                    {prop.roomTypes.map((rm) => (
                      <div key={rm.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                        <span className="text-slate-700 font-medium">{rm.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rm.priceFormatted}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            rm.availableRooms > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
                          }`}>
                            {rm.availableRooms} Left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Button
                onClick={() => setViewingProperty(prop)}
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<Eye className="w-3.5 h-3.5" />}
              >
                View Details & Amenities
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Property Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={resetForm}
        title="Add Student Accommodation Property"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleAddProperty} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Property Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bloomsbury Student Hall"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
              >
                <option value="Student Residence">Student Residence</option>
                <option value="Apartment">Apartment</option>
                <option value="Hostel">Hostel</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address and postal code"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nearby University / Campus
              </label>
              <input
                type="text"
                value={nearbyCampus}
                onChange={(e) => setNearbyCampus(e.target.value)}
                placeholder="e.g. University College London (UCL)"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Starting Monthly Rate ({currency})
              </label>
              <input
                type="number"
                value={startingRate}
                onChange={(e) => setStartingRate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description & Amenities
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe quiet study zones, security, kitchen appliances, and community events..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Property
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Property Details Modal */}
      {viewingProperty && (
        <Modal
          isOpen={true}
          onClose={() => setViewingProperty(null)}
          title={viewingProperty.name}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img src={viewingProperty.images[0]} alt={viewingProperty.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{viewingProperty.description}</p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Key Amenities</span>
              <div className="flex flex-wrap gap-2">
                {viewingProperty.amenities.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Resident Policies</span>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                {viewingProperty.policies.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setViewingProperty(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
