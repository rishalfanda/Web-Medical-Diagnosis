import supabase from "./supabase";

export async function getDiagnosis(){
    const { data, error } = await supabase
      .from("diagnosis")
      .select(
        "id, created_at ,image, ai_diagnosis, gejala, ai_model, model_type, model_version ,users(name), patients(fullName, gender)"
      )
      .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        throw new Error('diagnosis could not be loaded');
    }
    
    return data;
}

export async function getDiagnosisId(id) {
  const { data, error } = await supabase
    .from("diagnosis")
    .select(
      "id, created_at ,image, ai_diagnosis, gejala, ai_model, model_type, model_version ,users(name), patients(fullName, gender)"
    )
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("diagnosis could not be loaded");
  }

  return { data };
}