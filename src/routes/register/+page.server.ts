import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    
    if (!email) {
			return fail(400, { email, missing: true });
		}
    if (!username) {
			return fail(400, { username, missing: true });
		}

    const { data, error } = await supabase.auth.signUp(
      {
        email: String(email),
        password: String(password)
      }
    )
	}
} satisfies Actions;