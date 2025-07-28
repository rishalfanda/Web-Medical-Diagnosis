import supabase from "./supabase";


//get semua dataset
export async function getInstansi(){
    const {data, error} = await supabase
    .from("instansi")
    .select("id, created_at, name")
    .order("created_at", {ascending: true});

    if(error){
        console.log(error)
        throw new Error("Medical instances could not be loaded")
    }

    return data
}

//create dataset
export async function createEditinstansi(newInstansi, id) {
    let query = supabase.from("instansi")

    //create
    if(!id) query = query.insert([{...newInstansi}])

    //edit
    if(id) query = query.update({...newInstansi}).eq('id', id)

    const {data, error} = await query.select().single()

    if(error){
        console.log(error)
        throw new Error("Medical Instance could not be created")
    }

    return data
}

export async function deleteInstansi(id) {
  const { data, error } = await supabase.from('instansi').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Medical Instance could not be deleted');
  }

  return data;
}






