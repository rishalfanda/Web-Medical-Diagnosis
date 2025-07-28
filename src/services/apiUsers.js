import axios from "axios";
import supabase, { supabaseUrl } from "./supabase";

const flaskApiUrl = import.meta.env.VITE_FLASK_API_URL

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

export async function getUsersInstanceId(instance_id){
    const {data, error} = await supabase
    .from('users')
    .select("*")
    .eq("instance_id", instance_id)
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
  const response = await axios.post(`${flaskApiUrl}:5000/createuser`,
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
      const response = await axios.post(`${flaskApiUrl}:5000/createuser`,
      newUser,
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataSession.session.access_token}`
        }
      }
    )
    
    if (!response.data?.user) {
      console.log(error);
      throw new Error('user could not be created');
    }

    const user = response.data?.user;

    query = query.insert([{ ...rest, avatar: imagePath, role: (newUser.role ? newUser.role : "user"), auth_uuid: user.id}]);
  } 

  //B Edit
  if (id) {
    const check_uuid = await query.select("auth_uuid").eq('id', id).single();
    if (!check_uuid.data?.auth_uuid) {
      console.log(error);
      throw new Error('Could not retrieve user data before updating');
    }
    const { auth_uuid } = check_uuid.data;

    if (newUser.email || newUser.password) {
      var reqBody = {};
      if (newUser.email) {
        reqBody["email"] = newUser.email;
      }
      if (newUser.password) {
        reqBody["password"] = newUser.password;
      }
      const response = await axios.patch(`${flaskApiUrl}:5000/updateuser/${auth_uuid}`,
        reqBody,
        {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataSession.session.access_token}`
          }
        }
      )
      if (!response.data?.user) {
        console.log(error);
        throw new Error('user could not be edited');
      }

    }

    query = query.update({ ...rest, avatar: imagePath, auth_uuid: auth_uuid}).eq('id', id);
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

export async function deleteUser(id) {

  //get session from Supabase
  const { data: dataSession, error:errorSession } = await supabase.auth.getSession()
  if(errorSession){
    throw new Error("Error get session")
  }

  const check_uuid = await supabase.from('users').select("auth_uuid").eq('id', id).single();
  if (!check_uuid.data?.auth_uuid) {
    console.log(error);
    throw new Error('Could not retrieve user data before deleting');
  }
  const { auth_uuid } = check_uuid.data;

  //post create API
  const response = await axios.delete(`${flaskApiUrl}:5000/deleteuser/${auth_uuid}`,
    {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataSession.session.access_token}`
      }
    }
  )

  if (!response.data?.user) {
    console.log(error);
    throw new Error('user could not be deleted');
  }

  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Users could not be deleted');
  }

  return data;
}