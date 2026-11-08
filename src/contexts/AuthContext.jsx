import { createContext, useCallback, useEffect, useState, } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfile = useCallback(async (userId) => {
    setProfileLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_path, is_admin, created_at")
      .eq("id", userId)
      .maybeSingle();

    if (!error) {
      setProfile(data);
    }

    setProfileLoading(false);

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
      if (!mounted) return;

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
      setProfileLoading(false);
    }
  }, [user?.id, fetchProfile]);

  async function signUp({ displayName, email, password }) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
  }

  async function signIn({ email, password }) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async function updateProfile(updates) {
    if (!user) {
      return {
        data: null,
        error: new Error("Usuário não autenticado."),
      };
    }

    const allowedUpdates = {};

    if (updates.display_name !== undefined) {
      allowedUpdates.display_name = updates.display_name.trim();
    }

    if (updates.avatar_path !== undefined) {
      allowedUpdates.avatar_path = updates.avatar_path;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(allowedUpdates)
      .eq("id", user.id)
      .select("id, display_name, avatar_path, is_admin, created_at")
      .single();

    if (!error) {
      setProfile(data);
    }

    return { data, error };
  }

  async function updatePassword(password) {
    return await supabase.auth.updateUser({
      password,
    });
  }

  const refreshProfile = useCallback(() => {
    return user ? fetchProfile(user.id) : null;
  }, [user, fetchProfile]);

  const value = {
    user,
    session,
    profile,
    loading,
    profileLoading,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin === true,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updatePassword,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
