import axios from "axios";
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

//buat test doang
export async function postCreateUser(params) {
    //get session from Supabase
    const { data: dataSession, error:errorSession } = await supabase.auth.getSession()
    if(errorSession){
      throw new Error("Error get session")
    }


  //post create API
  const response = await axios.post('http://localhost:5000/createuser',
    params,
    {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataSession.session.access_token}`,
      }
    }
  )

  return response.data
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

  
  //get session from Supabase
    const { data: dataSession, error:errorSession } = await supabase.auth.getSession()
    if(errorSession){
      throw new Error("Error get session")
    }

    const { password, ...rest} = newUser
      let query = supabase.from('users');
  if (!id) {
      //post create API
    const response = await axios.post('http://localhost:5000/createuser',
      newUser,
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataSession.session.access_token}`,
        }
      }
    )
    if (!response.data?.user) {
      console.log(error);
      throw new Error('users could not be created');
    }

    const user = response.data?.user;
    console.log(user)


    //1 create/edit user

    //A Create

    query = query.insert([{ ...rest, avatar: imagePath, role: "user", auth_uuid: user.id
}]);
  } 

  //B Edit
  if (id) {
    const response = await axios.post('http://localhost:5000/updateuser/',
      newUser,
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataSession.session.access_token}`,
        }
      }
    )
    query = query.update({ ...rest, avatar: imagePath, role: "user", auth_uuid: user.id}).eq('id', id);
  }
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

export async function deleteUser(id, auth_uuid) {

    //get session from Supabase
    const { data: dataSession, error:errorSession } = await supabase.auth.getSession()
    if(errorSession){
      throw new Error("Error get session")
    }

  //post create API
  const response = await axios.delete('http://localhost:5000/deleteUser',
    {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataSession.session.access_token}`,
      }
    }
  )
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Users could not be deleted');
  }

  return data;
}