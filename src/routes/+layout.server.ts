import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	const user = (await supabase.auth.getSession()).data.session?.user;
	// redirect to login 
	if(!user && url.pathname !== "/login" && url.pathname !== "register") {
		throw redirect(307, "/login");
	}
	return { user };
};