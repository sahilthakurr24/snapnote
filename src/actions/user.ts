"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/auth/server";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {error : error}
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const details = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signUp(details);

  if (error) {
   console.log(error);
   return {error : error}
  }

  const userId = data.user?.id;
  if (!userId) {
    throw new Error("Error signing up");
  }

  //    add user to database

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function logout() {
  const supabase = await createClient();
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw new Error("unable to logout");
  }
}
