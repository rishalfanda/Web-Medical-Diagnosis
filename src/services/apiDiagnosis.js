import axios from "axios";
import supabase, { supabaseUrl } from "./supabase";

export async function getDiagnosis() {
  const { data, error } = await supabase
    .from("diagnosis")
    .select(
      "id, created_at ,image, ai_diagnosis, gejala, model_type, model_id, user_id, users(name), patients(fullName, gender)"
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("diagnosis could not be loaded");
  }

  return data;
}

export async function getDiagnosisId(id) {
  const { data, error } = await supabase
    .from("diagnosis")
    .select(
      "id, created_at, image, ai_diagnosis, gejala, model_type, model_id, user_id, Infiltrat, Konsolidasi, Kavitas, Efusi, Fibrotik, Kalsifikasi, users(name), patients(fullName, gender)"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("diagnosis could not be loaded");
  }

  return data ;
}

export async function getDiagnosisUserUuid(uuid) {
  const { data, error } = await supabase
    .from("diagnosis")
    .select(
      "id, created_at ,image, ai_diagnosis, gejala, model_type, model_id, user_id, patients(fullName, gender), users!inner(name)"
    )
    .eq("users.auth_uuid", uuid)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("diagnosis could not be loaded");
  }

  return data ;
}

export async function createDiagnosis(newDiagnosis) {
  const {
    ai_diagnosis,
    id, 
    fullName,
    gender,
    gejala,
    image,
    model_type,
    model_id,
    Infiltrat,    // luas purple
    Konsolidasi,  // luas pengganti putih
    Kavitas,      // luas yellow
    Efusi,        // luas brown
    Fibrotik,     // luas blue
    Kalsifikasi   // luas darktail
  } = newDiagnosis;


  const hasImagePath = image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${image?.name || image?.id}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/diagnosis-image/${imageName}`;

  //2. Upsert ke tabel patients
  const { data: patientData, error: patientError } = await supabase
    .from("patients")
    .upsert({ fullName, gender })
    .select()
    .single();

  if (patientError) {
    console.log(patientError);
    throw new Error("Gagal menyimpan data patient");
  }

  const payload = {
    user_id: id,
    patient_id: patientData.id,
    ai_diagnosis,
    gejala,
    image: imagePath,
    model_type,
    model_id,
    Infiltrat,    // luas purple
    Konsolidasi,  // luas pengganti putih
    Kavitas,      // luas yellow
    Efusi,        // luas brown
    Fibrotik,     // luas blue
    Kalsifikasi   // luas darktail
  };

  const { data, error } = await supabase
    .from("diagnosis")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Diagnosis could not be created");
  }

  //3 upload image
  if (!hasImagePath && image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("diagnosis-image")
      .upload(imageName, image);

    //4 deleting the diagnosis if there was an error uploading image
    if (storageError) {
      await supabase.from("diagnosis").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Diagnosis image could not be uploaded and the diagnosis was not created"
      );
    }
  }
  return data;
}

export async function deleteDiagnosis(id) {
  //1. Get data from diagnosis
  const { data: diagnosisData, error: fetchError } = await supabase
    .from("diagnosis")
    .select("patient_id")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.log(fetchError);
    throw new Error("Failed to get diagnosis data before deleted");
  }

  const { patient_id } = diagnosisData;

  //2. Delete Diagnosis
  const { error: deleteError } = await supabase
    .from("diagnosis")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.log(deleteError);
    throw new Error("Diagnosis tidak berhasil dihapus");
  }

  //3. Check if patient still use in another diagnosis
  const { count: patientCount, error: countPatientError } = await supabase
    .from("diagnosis")
    .select("*", { count: "exact", head: true })
    .eq("patient_id", patient_id);

  if (countPatientError) {
    console.log(countPatientError);
    throw new Error("Gagal memeriksa data patient id");
  }

  if (patientCount === 0) {
    await supabase.from("patients").delete().eq("id", patient_id);
  }

  return { success: true };
}

export async function postDiagnosis(data){
  const response = await axios.post('http://localhost:5000/predict', data)

  return response.data;
}
