import supabase, { supabaseUrl } from "./supabase";

export async function getCitra(id){
    const {data, error} = await supabase
    .from("citra")
    .select("id, created_at, kode_citra, image_citra, diagnosis, dataset_id, dataset(nama_dataset)")
    .order("created_at", {ascending: true})
    .eq("dataset_id", id)

    if(error){
        console.log(error)
        throw new Error("Citra could not be loaded")
    }

    return data
}

export async function createEditCitra(dataset_id, id, newCitra) {
  const { kode_citra, image_citra, diagnosis } = newCitra;

  const hasImagePath = image_citra?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${image_citra?.name || image_citra?.id}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? image_citra
    : `${supabaseUrl}/storage/v1/object/public/citra-image/${imageName}`;

  const payload = {
    dataset_id,
    kode_citra,
    image_citra: imagePath,
    diagnosis,
  };

  let query = supabase.from("citra");
  if (typeof id !== "undefined" && id !== null) {
    query = query.update(payload).eq("id", id);
  } else {
    query = query.insert([payload]);
  }

  const { data, error } = await query.select().maybeSingle();

  if (error || !data) {
    console.log(error || "Data not returned");
    throw new Error(id ? "Citra could not be updated" : "Citra could not be created");
  }

  if (!hasImagePath && image_citra instanceof File) {
    const { error: uploadError } = await supabase.storage
      .from("citra-image")
      .upload(imageName, image_citra);

    if (uploadError && !id) {
      await supabase.from("citra").delete().eq("id", data.id);
      console.log(uploadError);
      throw new Error("Citra image could not be uploaded. Create dibatalkan.");
    }
  }

  return data;
}

export async function deleteCitra(id) {
  const {data, error} = await supabase.from("citra").delete().eq("id", id)

  if(error){
    throw new Error("Citra could not be deleted")
  }

  return data
}