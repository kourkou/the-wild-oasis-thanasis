import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could not be loaded");

  return data;
}

export async function createCabin(newCabin) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) throw new Error("Cabin could not be deleted");
}

export async function updateCabin(updatedCabin) {
  const { id, ...fields } = updatedCabin;

  const hasImagePath = typeof fields.image === "string";

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${fields.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? fields.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...fields, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, fields.image);

  if (storageError) throw new Error("Cabin image could not be uploaded");

  return data;
}
