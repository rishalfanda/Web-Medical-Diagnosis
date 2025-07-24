import supabase, { supabaseUrl } from "./supabase";

export async function getUsers(){
    const {data, error} = await supabase
    .from('users')
    .select("*")
    .order('created_at', { ascending: true });

    if(error){
        console.log(error)
        throw new Error("users could not be load")
    }

    return data;
}

export async function getUser(id) {
    const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq('id', id)

    if(error){
        console.log(error)
        throw new Error("users could not be load")
    }

    return data;
}

export async function createEditUser(newUser, id){
    const hasImagePath = newUser.avatar?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newUser.avatar.name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = hasImagePath
    ? newUser.avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars//${imageName}`;

  //1 create/edit users
  let query = supabase.from('users');

  //A Create
  if (!id) query = query.insert([{ ...newUser, avatar: imagePath }]);

  //B Edit
  if (id) query = query.update({ ...newUser, avatar: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('users could not be created');
  }

  //2 upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(imageName, newUser.avatar);

  //3 deleting the users if there was an error uploading image while creating user
  if (storageError && !id) {
    await supabase.from('users').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Users image could not be uploaded and the user was not created',
    );
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Users could not be deleted');
  }

  return data;
}