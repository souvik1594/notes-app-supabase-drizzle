"use server";
import { getErrorMessage } from "@/lib/utils";
import { getSupabaseAuth, getUser } from "@/lib/auth";

export const createAccountAction = async (formdata: FormData) => {
  try {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const { error: signUpError } = await (
      await getSupabaseAuth()
    ).signUp({
      options: {
        data: {
          full_name: formdata.get("fullname") as string,
        },
      },
      email,
      password,
    });
    if (signUpError) throw signUpError;

    const { data, error: signInError } = await (
      await getSupabaseAuth()
    ).signInWithPassword({
      email,
      password,
    });
    if (signInError) throw signInError;
    if (!data.session) throw new Error("Session not created");
    return { error: null };
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Something went wrong");
    return { error: message };
  }
};

export const loginAccountAction = async (formdata: FormData) => {
  try {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const { data, error: signInError } = await (
      await getSupabaseAuth()
    ).signInWithPassword({
      email,
      password,
    });
    if (signInError) throw signInError;
    if (!data.session) throw new Error("Session not created");
    return { error: null };
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Something went wrong");
    return { error: message };
  }
};

export const logoutAccountAction = async () => {
  try {
    const { user } = await getUser();
    if (!user) throw new Error("User not found");
    console.log("🚀 ~ user:", user);
    const { error: signOutError } = await (await getSupabaseAuth()).signOut();
    if (signOutError) throw signOutError;
    return { error: null };
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Something went wrong");
    return { error: message };
  }
};
