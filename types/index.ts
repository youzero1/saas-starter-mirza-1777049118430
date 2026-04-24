export interface Part {
  id: string;
  part_number: string;
  name: string;
  description: string | null;
  category: string;
  car_make: string | null;
  car_model: string | null;
  car_year: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartFormData {
  part_number: string;
  name: string;
  description: string;
  category: string;
  car_make: string;
  car_model: string;
  car_year: string;
  price: string;
  stock_quantity: string;
  image_url: string;
}

export interface PartFilters {
  search: string;
  category: string;
  make: string;
  model: string;
  year: string;
}
