import { Part, PartFilters, PartFormData } from '@/types';

const BASE_URL = '/api';

export async function fetchParts(filters: PartFilters): Promise<Part[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.make) params.set('make', filters.make);
  if (filters.model) params.set('model', filters.model);
  if (filters.year) params.set('year', filters.year);

  const res = await fetch(`${BASE_URL}/parts?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch parts');
  }
  return res.json();
}

export async function fetchPart(id: string): Promise<Part> {
  const res = await fetch(`${BASE_URL}/parts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch part');
  }
  return res.json();
}

export async function createPart(data: PartFormData): Promise<Part> {
  const payload = {
    ...data,
    price: parseFloat(data.price) || 0,
    stock_quantity: parseInt(data.stock_quantity, 10) || 0,
    description: data.description || null,
    car_make: data.car_make || null,
    car_model: data.car_model || null,
    car_year: data.car_year || null,
    image_url: data.image_url || null,
  };

  const res = await fetch(`${BASE_URL}/parts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create part');
  }
  return res.json();
}

export async function updatePart(id: string, data: PartFormData): Promise<Part> {
  const payload = {
    ...data,
    price: parseFloat(data.price) || 0,
    stock_quantity: parseInt(data.stock_quantity, 10) || 0,
    description: data.description || null,
    car_make: data.car_make || null,
    car_model: data.car_model || null,
    car_year: data.car_year || null,
    image_url: data.image_url || null,
  };

  const res = await fetch(`${BASE_URL}/parts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update part');
  }
  return res.json();
}

export async function deletePart(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/parts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete part');
  }
}
