import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
    const data = await request.formData();
    const date = data.get("date-of-dream");
		const title = data.get('title')?.toString().trim().replace(/(\r\n|\n|\r)/gm, "");
		const description = data.get('description')?.toString().trim().replace(/\n\s*\n/g, '\n');
		const sentimentScore = data.get('sentiment-score') || 0;
    const wasDaydream = data.get("daydream-check");

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
      .insert(
        {
          user_id: userId, 
          title: title,
          description: description,
          sentiment: sentiment,
          type: type,
          date_of_dream: date
        }
      );
      if(error) {
        return { success: false, message: "A server error occurred. Please try again." };
      }
      return { success: true };
    } else {
      return { success: false, message: "Invalid fields." };
    }
	}
} satisfies Actions;