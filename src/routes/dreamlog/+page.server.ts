import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { data, error } = await supabase.from("blog_posts").select();

	return {
		pbdata: {
      user: data
    }
	};
};