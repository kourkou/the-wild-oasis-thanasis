import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const updateData = {};

  if (password) updateData.password = password;
  if (fullName) updateData.data = { ...updateData.data, fullName };

  let user;

  if (password || fullName) {
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    user = data.user;
  }

  if (!avatar) return user;

  const { data: currentUserData, error: currentUserError } =
    await supabase.auth.getUser();

  if (currentUserError) throw new Error(currentUserError.message);

  const currentUser = user ?? currentUserData.user;
  const fileName =
    `avatar-${currentUser.id}-${Math.random()}-${avatar.name}`.replaceAll(
      "/",
      "",
    );

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: updatedUserData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        ...currentUser.user_metadata,
        avatar: avatarUrl,
        ...(fullName ? { fullName } : {}),
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedUserData.user;
}
