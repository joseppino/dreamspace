import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		supabase.auth.signOut();
    throw redirect(307, "/login");
	}
} satisfies Actions;