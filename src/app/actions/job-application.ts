"use server";

import { supabase } from "@/lib/supabase";

export async function submitJobApplication(formData: FormData) {
  try {
    if (!supabase) {
      return {
        success: false,
        error: "Database connection not configured",
      };
    }

    // Extract form data
    const jobSlug = formData.get("jobSlug") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverMessage = formData.get("coverMessage") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate required fields
    if (!jobSlug || !jobTitle || !name || !email || !phone || !coverMessage) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Handle resume upload
    let resumeUrl = "";
    if (resumeFile && resumeFile.size > 0) {
      // Validate file size (5MB max)
      if (resumeFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: "Resume file size must be less than 5MB",
        };
      }

      // Create unique filename
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${jobSlug}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, resumeFile, {
          contentType: resumeFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Resume upload error:", uploadError);
        
        // Provide specific error messages
        if (uploadError.message.includes("Bucket not found")) {
          return {
            success: false,
            error: "Storage not configured. Please contact support. (Bucket 'resumes' not found)",
          };
        }
        
        return {
          success: false,
          error: `Failed to upload resume: ${uploadError.message}`,
        };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      resumeUrl = urlData.publicUrl;
    } else {
      return {
        success: false,
        error: "Resume is required",
      };
    }

    // Insert application into database
    const { data, error } = await supabase
      .from("job_applications")
      .insert({
        job_slug: jobSlug,
        job_title: jobTitle,
        applicant_name: name,
        email: email,
        phone: phone,
        resume_url: resumeUrl,
        cover_message: coverMessage,
        application_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      
      // Provide specific error messages
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        return {
          success: false,
          error: "Database table not set up. Please run the SQL schema first. (Table 'job_applications' not found)",
        };
      }
      
      return {
        success: false,
        error: `Failed to submit application: ${error.message}`,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Job application error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
