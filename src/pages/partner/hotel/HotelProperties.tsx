import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PlusCircle, Building2, Eye, Edit2, Clock, Wifi,
  Image as ImageIcon, UploadCloud, Trash2, Star,
  Link as LinkIcon, Sparkles, ChevronLeft, ChevronRight,
  RefreshCw
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { HotelProperty } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';

const SAMPLE_PROPERTY_PHOTOS = [
  { label: 'Modern Studio', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop' },
  { label: 'Cozy Bedroom', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop' },
  { label: 'Exterior Façade', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' },
  { label: 'Study & Lounge', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop' },
  { label: 'Modern Kitchenette', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop' },
  { label: 'Ensuite Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop' },
];

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

  // Property Photos State
  const [images, setImages] = useState<string[]>([DEFAULT_FALLBACK_IMAGE]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [replaceTargetIndex, setReplaceTargetIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeViewingImageIdx, setActiveViewingImageIdx] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

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
    setImages([DEFAULT_FALLBACK_IMAGE]);
    setImageUrlInput('');
    setReplaceTargetIndex(null);
    setEditingPropertyId(null);
    setIsFormModalOpen(false);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setImages([DEFAULT_FALLBACK_IMAGE]);
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
    setImages(prop.images && prop.images.length > 0 ? [...prop.images] : [DEFAULT_FALLBACK_IMAGE]);
    setImageUrlInput('');
    setReplaceTargetIndex(null);
    setIsFormModalOpen(true);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleFilesUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    let loadedCount = 0;
    const newBase64Images: string[] = [];

    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        showToast(`Skipped ${file.name}: Not an image file.`, 'warning');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast(`Skipped ${file.name}: File size exceeds 5MB limit.`, 'warning');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          newBase64Images.push(result);
        }
        loadedCount++;
        if (loadedCount === fileArray.length) {
          if (newBase64Images.length > 0) {
            setImages((prev) => [...prev, ...newBase64Images]);
            showToast(`Added ${newBase64Images.length} photo${newBase64Images.length > 1 ? 's' : ''}!`, 'success');
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const triggerReplaceImage = (idx: number) => {
    setReplaceTargetIndex(idx);
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFile = (files: FileList | null) => {
    if (!files || files.length === 0 || replaceTargetIndex === null) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'warning');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size exceeds 5MB limit.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImages((prev) => {
          const copy = [...prev];
          copy[replaceTargetIndex] = result;
          return copy;
        });
        showToast('Photo changed successfully!', 'success');
      }
      setReplaceTargetIndex(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) {
      showToast('Please enter a valid web image URL (starting with http:// or https://).', 'error');
      return;
    }
    setImages((prev) => [...prev, trimmed]);
    setImageUrlInput('');
    showToast('Photo URL added to gallery!', 'success');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    showToast('Photo removed.', 'info');
  };

  const handleMakeCover = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const item = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [item, ...rest];
    });
    showToast('Primary cover photo updated!', 'success');
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Property name is required.', 'error');
      return;
    }

    const propertyImages = images.length > 0 ? images : [DEFAULT_FALLBACK_IMAGE];

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
            images: propertyImages,
            checkInTime,
            checkOutTime,
            cancellationPolicy,
            freeCancellationHours: Number(freeCancellationHours) || 0,
            featuredRateFormatted: `From ${currency === 'GBP' ? '£' : currency + ' '}${startingRate} / month`,
          },
          currentPartnerId
        );

        setProperties(partnerService.getHotelProperties());
        showToast('Property details and photos updated successfully!', 'success');
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
          images: propertyImages,
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
                <img
                  src={prop.images?.[0] || DEFAULT_FALLBACK_IMAGE}
                  alt={prop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs">
                  {prop.propertyType}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  {prop.status}
                </span>
                {prop.images && prop.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/70 text-white backdrop-blur-xs flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {prop.images.length} photos
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-20 text-white">
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
                onClick={() => {
                  setViewingProperty(prop);
                  setActiveViewingImageIdx(0);
                }}
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

          {/* Section 2: Property Photos & Media */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>Property Photos & Media</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                {images.length} photo{images.length !== 1 ? 's' : ''} uploaded
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Upload photos from your device, enter web image URLs, or select curated sample room presets. The first image serves as the primary cover photo.
            </p>

            {/* Hidden file inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFilesUpload(e.target.files);
                e.target.value = '';
              }}
            />
            <input
              type="file"
              ref={replaceFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleReplaceFile(e.target.files);
                e.target.value = '';
              }}
            />

            {/* Thumbnail Grid */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`group relative rounded-2xl border overflow-hidden bg-slate-100 shadow-2xs transition-all ${
                      idx === 0 ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="h-28 w-full overflow-hidden bg-slate-200">
                      <img
                        src={img}
                        alt={`Property photo ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    {/* Primary Badge or Set Cover button */}
                    {idx === 0 ? (
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMakeCover(idx)}
                        className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-slate-900/70 hover:bg-blue-600 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 backdrop-blur-xs cursor-pointer"
                        title="Set as Cover Photo"
                      >
                        <Star className="w-2.5 h-2.5" />
                        Set Cover
                      </button>
                    )}

                    {/* Actions Bar (Replace & Remove) */}
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => triggerReplaceImage(idx)}
                        className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-xs backdrop-blur-xs transition-colors cursor-pointer"
                        title="Change / Replace photo"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 rounded-md bg-white/90 hover:bg-red-50 text-slate-700 hover:text-red-600 shadow-xs backdrop-blur-xs transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="px-2 py-1 bg-white border-t border-slate-100 text-[10px] text-slate-500 font-medium truncate">
                      Photo {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
                <span>No photos selected. Please upload or choose a sample room below.</span>
                <button
                  type="button"
                  onClick={() => setImages([DEFAULT_FALLBACK_IMAGE])}
                  className="font-bold underline ml-2 cursor-pointer"
                >
                  Use Default Photo
                </button>
              </div>
            )}

            {/* Upload Zone & URL Bar */}
            <div className="space-y-3 pt-1">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files) {
                    handleFilesUpload(e.dataTransfer.files);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-5 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50/60'
                    : 'border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Click to upload or drag & drop photos here
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Supports PNG, JPG, JPEG, WebP (Max 5MB per file)
                  </div>
                </div>
              </div>

              {/* Add via Web URL */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Or paste an image web URL (e.g. https://images.unsplash.com/...)"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => handleAddImageUrl()}
                  variant="secondary"
                  size="sm"
                  disabled={!imageUrlInput.trim()}
                >
                  Add URL
                </Button>
              </div>

              {/* Sample Presets */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Presets (Click to add high-res sample room photos):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_PROPERTY_PHOTOS.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => {
                        setImages((prev) => [...prev, sample.url]);
                        showToast(`Added sample: ${sample.label}`, 'success');
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3 h-3 text-slate-400" />
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Property Description */}
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

          {/* Section 4: Amenities */}
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

          {/* Section 5: Policies */}
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
            {/* Interactive Image Gallery */}
            <div className="space-y-2">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 shadow-inner group">
                <img
                  src={
                    viewingProperty.images?.[activeViewingImageIdx] ||
                    viewingProperty.images?.[0] ||
                    DEFAULT_FALLBACK_IMAGE
                  }
                  alt={viewingProperty.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {viewingProperty.images && viewingProperty.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveViewingImageIdx((prev) =>
                          prev > 0 ? prev - 1 : viewingProperty.images.length - 1
                        )
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      title="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveViewingImageIdx((prev) =>
                          prev < viewingProperty.images.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      title="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {activeViewingImageIdx + 1} / {viewingProperty.images.length}
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {viewingProperty.images && viewingProperty.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {viewingProperty.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveViewingImageIdx(idx)}
                      className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeViewingImageIdx === idx
                          ? 'border-blue-600 ring-2 ring-blue-500/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
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

