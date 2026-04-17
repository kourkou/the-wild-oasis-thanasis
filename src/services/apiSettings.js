import supabase from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*");
  if (error) throw new Error(error.message);

  return { data, error };
}

export async function updateSettings(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  if (error) throw new Error(error.message);

  return { data };
}
