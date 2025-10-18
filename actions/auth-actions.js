"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

// Login action
export const login = async (prevState, formData) => {
  const supabase = await createClient();

  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    if (error.code === "invalid_credentials") {
      return { errors: { credentials: "Inavild credentials." } };
    }
    throw error;
  }

  const role = data.user?.user_metadata?.role;

  if (role === "1") {
    redirect("/recruiter");
  } else if (role === "2") {
    redirect("/candidate");
  }
};

// Sign up action
export const signup = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  const supabase = await createClient();

  const data = {
    email,
    password,
    options: {
      data: { role },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.code === "user_already_exists") {
      return { errors: { email: "User with this email already exists." } };
    }
    throw error;
  }

  // At this point, Supabase has created the session cookie if auto-confirmed
  if (role === "1") {
    redirect("/recruiter");
  } else if (role === "2") {
    redirect("/candidate");
  }
};

// Auth action
export const auth = async (mode, prevState, formData) => {
  if (mode === "login") return login(prevState, formData);

  return signup(prevState, formData);
};

// Logout action
export const logout = async () => {
  const supabase = await createClient();

  // sign out the user (clears session cookie)
  await supabase.auth.signOut();

  redirect("/auth");
};
