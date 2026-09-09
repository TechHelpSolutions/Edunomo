import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PlusCircle, Building2, Eye, Edit2, Clock, Wifi
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { HotelProperty } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';

const MASTER_AMENITIES = [
  'WiFi',
  'Parking',
  'Swimming Pool',
  'Breakfast',
  'Air Conditioning',
  'Restaurant',
  'Gym',
  'Laundry',
  '24/7 Reception',
  'Study Lounges',
  'Elevator',
  'Private Kitchenette',
  'Ensuite Bathroom',
  'Bicycle Storage',
  'CCTV Security',
];

export const HotelProperties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const { partner } = usePartnerAuth();

  const [properties, setProperties] = useState<HotelProperty[]>(partnerService.getHotelProperties());
  const [isFormModalOpen, setIsFormModalOpen] = useState(searchParams.get('action') === 'new');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [viewingProperty, setViewingProperty] = useState<HotelProperty | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState<'Student Residence' | 'Hostel' | 'Hotel' | 'Apartment' | 'Guesthouse'>('Student Residence');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('London');
  const [country, setCountry] = useState('United Kingdom');
  const [nearbyCampus, setNearbyCampus] = useState('');
  const [distanceToCampus, setDistanceToCampus] = useState('10 min transit');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi', '24/7 Reception', 'Study Lounges']);
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [cancellationPolicy, setCancellationPolicy] = useState('Free cancellation up to 48 hours before check-in. Non-refundable thereafter.');
  const [freeCancellationHours, setFreeCancellationHours] = useState<number>(48);
  const [startingRate, setStartingRate] = useState('650');
  const [currency, setCurrency] = useState('GBP');

  const currentPartnerId = partner?.id || 'partner-hotel-001';

  const resetForm = () => {
    setName('');
    setPropertyType('Student Residence');
    setAddress('');
    setCity('London');
    setCountry('United Kingdom');
    setNearbyCampus('');
    setDistanceToCampus('10 min transit');
    setDescription('');
    setSelectedAmenities(['WiFi', '24/7 Reception', 'Study Lounges']);
    setCheckInTime('15:00');
    setCheckOutTime('11:00');
    setCancellationPolicy('Free cancellation up to 48 hours before check-in. Non-refundable thereafter.');
    setFreeCancellationHours(48);
    setStartingRate('650');
    setCurrency('GBP');
    setEditingPropertyId(null);
    setIsFormModalOpen(false);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (prop: HotelProperty) => {
    // Enforce partner ownership rule: partner can edit only their own property
    if (prop.partnerId !== currentPartnerId) {
      showToast('Unauthorized: You can only edit your own accommodation properties.', 'error');
      return;
    }

    setEditingPropertyId(prop.id);
    setName(prop.name);
    setPropertyType(prop.propertyType as any);
    setAddress(prop.address);
    setCity(prop.city);
    setCountry(prop.country);
    setNearbyCampus(prop.nearbyCampus || '');
    setDistanceToCampus(prop.distanceToCampus || '10 min transit');
    setDescription(prop.description || '');
    setSelectedAmenities(prop.amenities || []);
    setCheckInTime(prop.checkInTime || '15:00');
    setCheckOutTime(prop.checkOutTime || '11:00');
    setCancellationPolicy(prop.cancellationPolicy || 'Free cancellation up to 48 hours before check-in. Non-refundable thereafter.');
    setFreeCancellationHours(prop.freeCancellationHours ?? 48);
    setStartingRate(prop.roomTypes[0]?.pricePerMonth?.toString() || '650');
    setCurrency(prop.roomTypes[0]?.currency || 'GBP');
    setIsFormModalOpen(true);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Property name is required.', 'error');
      return;
    }

    try {
      if (editingPropertyId) {
        // Edit Mode: Persist updates while preserving existing room inventory & property status
        partnerService.updateProperty(
          editingPropertyId,
          {
            name,
            propertyType,
            address,
            city,
            country,
            nearbyCampus: nearbyCampus || 'Central District / Transit Hub',
            distanceToCampus,
            description: description.trim() || 'Modern accommodation located near the city centre with comfortable rooms and convenient access to public transport.',
            amenities: selectedAmenities,
            checkInTime,
            checkOutTime,
            cancellationPolicy,
            freeCancellationHours: Number(freeCancellationHours) || 0,
            featuredRateFormatted: `From ${currency === 'GBP' ? '£' : currency + ' '}${startingRate} / month`,
          },
          currentPartnerId
        );

        setProperties(partnerService.getHotelProperties());
        showToast('Property details updated successfully!', 'success');
        resetForm();
      } else {
        // Add Mode: Create new property
        partnerService.addProperty({
          name,
          propertyType,
          address,
          city,
          country,
          description: description.trim() || 'Modern accommodation located near the city centre with comfortable rooms and convenient access to public transport.',
          nearbyCampus: nearbyCampus || 'Central District / Transit Hub',
          distanceToCampus,
          images: [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
          ],
          amenities: selectedAmenities.length > 0 ? selectedAmenities : ['WiFi', '24/7 Reception'],
          policies: [
            cancellationPolicy,
            `Check-in: from ${checkInTime}, Check-out: by ${checkOutTime}`,
            'Valid government-issued photo ID required upon arrival',
          ],
          checkInTime,
          checkOutTime,
          cancellationPolicy,
          freeCancellationHours: Number(freeCancellationHours) || 0,
          roomTypes: [
            {
              id: `room-${Date.now()}-1`,
              name: 'Standard Studio Unit',
              capacity: 1,
              pricePerMonth: parseInt(startingRate) || 650,
              priceFormatted: `${currency === 'GBP' ? '£' : currency + ' '}${startingRate} / month`,
              currency,
              amenities: ['En-Suite Bathroom', 'Study Desk', 'WiFi'],
              availableRooms: 6,
              totalRooms: 30,
              status: 'Available',
            },
          ],
          startingRate: parseInt(startingRate) || 650,
          currency,
        });

        setProperties(partnerService.getHotelProperties());
        showToast('New property published to Edunomo Accommodations network!', 'success');
        resetForm();
      }
    } catch (err: any) {
      showToast(err?.message || 'Failed to save property.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Accommodations & Living Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage student residences, serviced apartments, and transit hotels for all customers
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
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
                {/* Dedicated Property Description */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">About the Property</span>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{prop.description}</p>
                </div>

                {/* Amenities Badges Preview */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Amenities</span>
                  <div className="flex flex-wrap gap-1">
                    {prop.amenities?.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {amenity}
                      </span>
                    ))}
                    {(prop.amenities?.length || 0) > 4 && (
                      <span className="text-[10px] font-medium text-slate-400 self-center">
                        +{prop.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Policies Preview */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-in / Check-out</span>
                    <span className="font-semibold text-slate-800 block truncate">
                      {prop.checkInTime || '14:00'} / {prop.checkOutTime || '11:00'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cancellation</span>
                    <span className="font-semibold text-slate-800 block truncate">
                      {prop.freeCancellationHours ? `Free up to ${prop.freeCancellationHours}h` : 'Flexible'}
                    </span>
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

            {/* Explicit Actions: Edit Property & View Details */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <Button
                onClick={() => setViewingProperty(prop)}
                variant="outline"
                size="sm"
                leftIcon={<Eye className="w-3.5 h-3.5" />}
              >
                View Details
              </Button>
              <Button
                onClick={() => handleOpenEditModal(prop)}
                variant="secondary"
                size="sm"
                leftIcon={<Edit2 className="w-3.5 h-3.5" />}
              >
                Edit Property
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Property Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={resetForm}
        title={editingPropertyId ? 'Edit Accommodation Property' : 'Add Accommodation Property'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSaveProperty} className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
          {/* Section 1: Property Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Building2 className="w-4 h-4 text-[#0D2A68]" />
              <span>Property Information</span>
            </h3>

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
                  placeholder="e.g. Bloomsbury Central Residence"
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
                  <option value="Hotel">Hotel</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Guesthouse">Guesthouse</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Address *
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
                  Nearby Landmark / Campus
                </label>
                <input
                  type="text"
                  value={nearbyCampus}
                  onChange={(e) => setNearbyCampus(e.target.value)}
                  placeholder="e.g. City Centre / King’s Cross St Pancras"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Starting Rate ({currency})
                </label>
                <input
                  type="number"
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Property Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <span>Property Description</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Provide general overview text only. Do not duplicate individual amenity lists or check-in rules here.
            </p>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Modern accommodation located near the city centre with comfortable rooms and convenient access to public transport."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white leading-relaxed"
            />
          </div>

          {/* Section 3: Amenities */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Amenities (Select all that apply)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {MASTER_AMENITIES.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="accent-[#0D2A68] rounded cursor-pointer"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Property Policies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Check-in Time
                </label>
                <input
                  type="text"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  placeholder="e.g. 15:00 or 3:00 PM"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Check-out Time
                </label>
                <input
                  type="text"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  placeholder="e.g. 11:00 or 11:00 AM"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cancellation Policy
                </label>
                <input
                  type="text"
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  placeholder="e.g. Free cancellation up to 48 hours before check-in"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Free Cancellation Window (Hours)
                </label>
                <input
                  type="number"
                  min="0"
                  value={freeCancellationHours}
                  onChange={(e) => setFreeCancellationHours(Number(e.target.value))}
                  placeholder="e.g. 24, 48, 72"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingPropertyId ? 'Save Changes' : 'Publish Property'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Property Details Modal with Separated Sections */}
      {viewingProperty && (
        <Modal
          isOpen={true}
          onClose={() => setViewingProperty(null)}
          title={viewingProperty.name}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img src={viewingProperty.images[0]} alt={viewingProperty.name} className="w-full h-full object-cover" />
            </div>

            {/* Separated Section A: About the Property */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                About the Property
              </span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {viewingProperty.description || 'No description provided.'}
              </p>
            </div>

            {/* Separated Section B: Amenities */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Amenities
              </span>
              <div className="flex flex-wrap gap-2">
                {viewingProperty.amenities?.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-medium border border-blue-100">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Separated Section C: Policies */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Policies
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-in</span>
                  <span className="font-semibold text-slate-800">{viewingProperty.checkInTime || '15:00'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-out</span>
                  <span className="font-semibold text-slate-800">{viewingProperty.checkOutTime || '11:00'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Free Cancellation</span>
                  <span className="font-semibold text-emerald-700">
                    {viewingProperty.freeCancellationHours ? `${viewingProperty.freeCancellationHours} hours before arrival` : 'Non-refundable'}
                  </span>
                </div>
              </div>
              {viewingProperty.cancellationPolicy && (
                <p className="text-xs text-slate-600 italic px-1">
                  Policy note: {viewingProperty.cancellationPolicy}
                </p>
              )}
            </div>

            {/* Room Configurations */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Room Configurations ({viewingProperty.roomTypes?.length || 0})
              </span>
              <div className="space-y-1.5">
                {viewingProperty.roomTypes?.map((rm) => (
                  <div key={rm.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">{rm.name}</span>
                      <span className="text-slate-500 text-[10px]">{rm.amenities.join(', ')}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">{rm.priceFormatted}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{rm.availableRooms} available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <Button
                onClick={() => {
                  setViewingProperty(null);
                  handleOpenEditModal(viewingProperty);
                }}
                variant="outline"
                size="sm"
                leftIcon={<Edit2 className="w-3.5 h-3.5" />}
              >
                Edit Property
              </Button>
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

