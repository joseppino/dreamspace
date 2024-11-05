import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: LayoutServerLoad = async ({ params }) => {
  const { data }  = await supabase.from("dreams").select().eq("uuid", params.slug).single();
  console.log(data);
  
	if (data) {
		return { ...data };
	}

	error(404, 'Not found');
};