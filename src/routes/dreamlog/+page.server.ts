import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageLoad } from "./$types";

export const load: PageLoad = async () => {

  const { user } = (await supabase.auth.getUser()).data;
  
  const { data, error } = await supabase.from("dreams").select().order("date_of_dream", { ascending: false });  

	return {
    dreams: data
	};
};

export const actions = {
  edit: async ({ request }) => {
    const formData = await request.formData();
    const dreamid = formData.get("dreamid-hidden");
    throw redirect(303, `/dream/${dreamid}/edit`);
  },

  view: async ({ request }) => {
    const formData = await request.formData();
    const dreamid = formData.get("dreamid-hidden");
    throw redirect(303, `/dream/${dreamid}/view`);
  }
} satisfies Actions;