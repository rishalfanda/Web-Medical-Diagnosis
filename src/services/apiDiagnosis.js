import supabase from "./supabase";

export async function getDiagnosis(){
    const {data, error} = await supabase
    .from("diagnosis")
    .select("id, created_at ,image, ai_diagnosis, gejala, ai_model, users(name), patients(fullName)")
    .order('created_at', { ascending: true });

    if (error) {
        console.error(error);
        throw new Error('diagnosis could not be loaded');
    }
    
    return data;
}