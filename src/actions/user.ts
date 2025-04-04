"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/primsa";
import { createClient } from "@/auth/server";

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
    return { error: error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const details = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  const { data, error } = await supabase.auth.signUp(details);

  if (error) {
    console.log(error);
    return { error: error };
  }

  const userId = data.user?.id;
  if (!userId) {
   return {error}
  }

  //    add user to database

  await prisma?.user.create({
    data: {
      id: userId,
      email: details.email,
    },
  });

  revalidatePath("/", "layout");
  redirect("/login");
}


export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
