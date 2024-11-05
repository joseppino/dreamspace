import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	delete: async ({ cookies, request }) => {
    const data = await request.formData();
    const dreamId = data.get("dreamid-hidden");

    const { error } = await supabase.from("dreams").delete().eq("uuid", dreamId);

    if(error) {
      return { success: false }
    } else {
      throw redirect(303, "/dreamlog");
    }
  },
  
  commit: async ({ cookies, request }) => {
  }
} satisfies Actions;