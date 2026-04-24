import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const make = searchParams.get('make') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';

  let query = supabase.from('parts').select('*').order('created_at', { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,part_number.ilike.%${search}%,category.ilike.%${search}%`);
  }
  if (category) {
    query = query.ilike('category', `%${category}%`);
  }
  if (make) {
    query = query.ilike('car_make', `%${make}%`);
  }
  if (model) {
    query = query.ilike('car_model', `%${model}%`);
  }
  if (year) {
    query = query.eq('car_year', year);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from('parts')
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
