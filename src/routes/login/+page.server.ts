import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

// export const load: PageServerLoad = async ({ cookies }) => {
// };

export const actions = {
	default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");    
    
    if (!email) {
      console.log("trig'd");
			return fail(400, { email, missing: true });
		}
    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email: String(email),
        password: String(password)
      }
    );
    if (error) {
      console.error(error.message);
      return { success: false };
    } else {
      return { success: true };
    }
	}
} satisfies Actions;