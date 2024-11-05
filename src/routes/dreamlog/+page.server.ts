import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {

  const { user } = (await supabase.auth.getUser()).data;
  
  const { data, error } = await supabase.from("dreams").select().order("date_of_dream", { ascending: false });  

	return {
    dreams: data
	};
};