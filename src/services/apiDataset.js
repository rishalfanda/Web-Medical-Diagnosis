import supabase from "./supabase";


//get semua dataset
export async function getDatasets(){
    const {data, error} = await supabase
    .from("dataset")
    .select("id, created_at, nama_dataset, lokasi, instance_id")
    .order("created_at", {ascending: true});

    if(error){
        console.log(error)
        throw new Error("Datasets could not be loaded")
    }

    return data
}

export async function getDatasetsInstanceId(instance_id){
    const {data, error} = await supabase
    .from("dataset")
    .select("id, created_at, nama_dataset, lokasi, instance_id")
    .eq("instance_id", instance_id)
    .order("created_at", {ascending: true});

    if(error){
        console.log(error)
        throw new Error("Datasets could not be loaded")
    }

    return data
}

//create dataset
export async function createEditDataset(newDataset, id) {
    let query = supabase.from("dataset")

    //create
    if(!id) query = query.insert([{...newDataset}])

    //edit
    if(id) query = query.update({...newDataset}).eq('id', id)

    const {data, error} = await query.select().single()

    if(error){
        console.log(error)
        throw new Error("Dataset could not be created")
    }

    return data
}