import { supabase } from '$lib/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const user = (await supabase.auth.getSession()).data.session?.user;  
	return { user };
};