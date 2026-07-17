"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";


export async function revokeCourseAccessAction(
  profileId:string,
  courseId:string
) {

  try {

    const supabase = getSupabaseAdmin();


    const { error } = await supabase
      .from("profile_courses")
      .update({
        status:"revoked",
        updated_at:new Date().toISOString()
      })
      .eq("profile_id", profileId)
      .eq("course_id", courseId);


    if(error){
      logger.error(
        "Errore revoca corso:",
        error
      );

      return {
        success:false,
        error:error.message
      };
    }


    return {
      success:true,
      message:"Accesso al corso revocato."
    };


  } catch(err:any){

    return {
      success:false,
      error:err.message
    };

  }
}