import { createContext, useCallback, useEffect, useState, } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!error) {
      setProfile(data);
    }

    return { data, error };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Erro ao recuperar sessão:", error.message);
      }

      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else {
      setProfile(null);
    }
  }, [user?.id, fetchProfile]);

  async function signUp({ displayName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    return { data, error };
  }

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async function updateProfile(updates) {
    if (!user) {
      return { error: new Error("Usuário não autenticado.") };
    }

    const allowedUpdates = {};

    if (updates.display_name !== undefined) {
      allowedUpdates.display_name = updates.display_name;
    }

    if (updates.avatar_path !== undefined) {
      allowedUpdates.avatar_path = updates.avatar_path;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(allowedUpdates)
      .eq("id", user.id)
      .select()
      .single();

    if (!error) {
      setProfile(data);
    }

    return { data, error };
  }

  async function updatePassword(password) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    return { data, error };
  }

  const value = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin === true,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updatePassword,
    refreshProfile: () => user ? fetchProfile(user.id) : null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
