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
    const data = await request.formData();
    const date = data.get("date-of-dream");
		const title = data.get('title')?.toString().trim().replace(/(\r\n|\n|\r)/gm, "");
		const description = data.get('description')?.toString().trim().replace(/\n\s*\n/g, '\n');
    console.log(description);
    
		const sentimentScore = data.get('sentiment-score') || 0;
    const wasDaydream = data.get("daydream-check");
    const dreamId = data.get("dreamid-hidden");

    let type: string = "night-dream";
    if(wasDaydream) {
      type = "day-dream";
    }
    
    let sentiment: string = "neutral";
    switch (sentimentScore.toString()) {
      case "-1":
        sentiment = "bad";
        break;
      case "1":
        sentiment = "good";
        break;
      default:
        sentiment = "neutral";
        break;
    }

    const userId = (await supabase.auth.getUser()).data.user?.id;

    if(userId && title?.length && description?.length) {
      const { error } = await supabase
      .from('dreams')
      .update(
        {
          title: title,
          description: description,
          sentiment: sentiment,
          type: type,
          date_of_dream: date
        }
      )
      .eq("uuid", dreamId);
      if(error) {
        return { success: false, message: "A server error occurred. Please try again." };
      }
      return { success: true };
    } else {
      return { success: false, message: "Invalid fields." };
    }
  }
} satisfies Actions;