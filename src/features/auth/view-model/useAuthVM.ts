import { supabase } from "@/core/lib/supabase";
import { clearJwt, saveJwt } from "@/core/lib/tokenStorage";
import { useState } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const NETWORK_ERROR_PATTERNS = [
  /network request failed/i,
  /fetch failed/i,
  /failed to fetch/i,
  /network error/i,
  /internet connection/i,
  /connection refused/i,
  /timeout/i,
];

function normalizeErrorMessage(err: unknown, fallback: string): string {
  const msg =
    typeof (err as any)?.message === "string" ? (err as any).message : "";
  if (!msg) return fallback;
  const isNetwork = NETWORK_ERROR_PATTERNS.some((p) => p.test(msg));
  return isNetwork
    ? "Sem conexão. Verifique sua internet e tente novamente."
    : msg;
}

export function useAuthVM() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password;

      if (!normalizedEmail) {
        const msg = "Email é obrigatório.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (!isValidEmail(normalizedEmail)) {
        const msg = "Email inválido.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (!normalizedPassword) {
        const msg = "Senha é obrigatória.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (normalizedPassword.length < 6 || normalizedPassword.length > 8) {
        const msg = "Senha deve ter entre 6 e 8 caracteres.";
        setError(msg);
        return { success: false, error: msg };
      }

      const { error: sbError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: normalizedPassword,
      });

      if (sbError) throw sbError;
      const { data } = await supabase.auth.getSession();
      const jwt = data.session?.access_token;
      if (jwt) await saveJwt(jwt);
      return { success: true };
    } catch (err: any) {
      const msg = normalizeErrorMessage(err, "Falha ao fazer login.");
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const normalizedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password;

      if (!normalizedName) {
        const msg = "Nome é obrigatório.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (normalizedName.length < 2) {
        const msg = "Nome deve ter pelo menos 2 caracteres.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (!normalizedEmail) {
        const msg = "Email é obrigatório.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (!isValidEmail(normalizedEmail)) {
        const msg = "Email inválido.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (!normalizedPassword) {
        const msg = "Senha é obrigatória.";
        setError(msg);
        return { success: false, error: msg };
      }
      if (normalizedPassword.length < 6 || normalizedPassword.length > 8) {
        const msg = "Senha deve ter entre 6 e 8 caracteres.";
        setError(msg);
        return { success: false, error: msg };
      }

      const { data, error: sbError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: normalizedPassword,
        options: {
          data: { full_name: normalizedName },
        },
      });

      if (sbError) throw sbError;

      // Salvar nome na tabela user_profiles (se a tabela existir)
      // O trigger também faz isso, mas garantimos aqui também
      // Se falhar, não quebra o cadastro - o nome já está no user_metadata
      if (data.user?.id) {
        try {
          const { error: profileError } = await supabase
            .from("user_profiles")
            .upsert(
              {
                id: data.user.id,
                full_name: normalizedName,
                name: normalizedName,
              },
              { onConflict: "id" },
            );

          // Se houver erro (RLS, tabela não existe, etc), apenas loga
          // O nome já está salvo no user_metadata, então o cadastro é válido
          if (profileError) {
            console.warn(
              "Erro ao salvar perfil (não crítico):",
              profileError.message,
            );
          }
        } catch (profileErr) {
          // Erro de rede ou outro - não crítico, o nome já está no metadata
          console.warn("Erro ao salvar perfil (não crítico):", profileErr);
        }
      }

      const jwt = data.session?.access_token;
      if (jwt) await saveJwt(jwt);
      return { success: true };
    } catch (err: any) {
      const msg = normalizeErrorMessage(err, "Falha ao criar conta.");
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await clearJwt();
  };

  return {
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
  };
}
