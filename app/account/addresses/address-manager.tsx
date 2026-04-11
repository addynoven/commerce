"use client";

import { useState } from "react";
import { createAddress, updateAddress, deleteAddress, setDefaultAddress } from "./actions";
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/24/outline";

export function AddressManager({ initialAddresses, defaultAddressId }: { initialAddresses: any[], defaultAddressId?: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, id?: string) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const result = id ? await updateAddress(id, formData) : await createAddress(formData);
    
    if (result.error) {
      setError(result.error);
    } else {
      setIsAdding(false);
      setEditingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-serif font-bold text-neutral-900">Your Addresses</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-[#606E4C] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#4a553a] transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Add New Address
        </button>
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      {(isAdding || editingId) && (
        <div className="bg-white border border-neutral-200 p-8 rounded-lg shadow-sm">
          <h3 className="text-lg font-serif font-bold text-neutral-900 mb-6">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={(e) => handleSubmit(e, editingId || undefined)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input type="text" name="firstName" placeholder="First Name" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).firstName : ""} />
              <input type="text" name="lastName" placeholder="Last Name" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).lastName : ""} />
              <input type="text" name="company" placeholder="Company (Optional)" className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).company : ""} />
              <input type="text" name="phone" placeholder="Phone" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).phone : ""} />
            </div>
            <div className="space-y-4">
              <input type="text" name="address1" placeholder="Address 1" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).address1 : ""} />
              <input type="text" name="address2" placeholder="Address 2 (Optional)" className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).address2 : ""} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).city : ""} />
                <input type="text" name="zip" placeholder="ZIP/Postal Code" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).zip : ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="province" placeholder="State/Province" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).province : ""} />
                <input type="text" name="country" placeholder="Country" required className="address-input" defaultValue={editingId ? initialAddresses.find(a => a.id === editingId).country : ""} />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-neutral-100">
              <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-neutral-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                {editingId ? "Save Changes" : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {initialAddresses.map((address) => (
          <div key={address.id} className={`bg-white border p-6 rounded-lg relative ${address.id === defaultAddressId ? 'border-neutral-900 shadow-md' : 'border-neutral-200'}`}>
            {address.id === defaultAddressId && (
              <span className="absolute top-4 right-4 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 flex items-center gap-1">
                <CheckIcon className="h-3 w-3" />
                Default
              </span>
            )}
            <div className="text-sm space-y-1 text-neutral-600 font-sans">
              <p className="font-bold text-neutral-900">{address.firstName} {address.lastName}</p>
              {address.company && <p>{address.company}</p>}
              <p>{address.address1}</p>
              {address.address2 && <p>{address.address2}</p>}
              <p>{address.city}, {address.province} {address.zip}</p>
              <p>{address.country}</p>
              <p className="pt-2">{address.phone}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-100 flex gap-4">
              <button onClick={() => setEditingId(address.id)} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-neutral-900 hover:text-[#6e3835] transition-colors">
                <PencilIcon className="h-4 w-4" />
                Edit
              </button>
              <button onClick={() => deleteAddress(address.id)} className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors">
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
              {address.id !== defaultAddressId && (
                <button onClick={() => setDefaultAddress(address.id)} className="ml-auto text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 underline underline-offset-4 decoration-neutral-200 hover:decoration-neutral-900 transition-all">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .address-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e5e5;
          outline: none;
          font-family: var(--font-jakarta);
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        .address-input:focus {
          border-color: #171717;
        }
      `}</style>
    </div>
  );
}
