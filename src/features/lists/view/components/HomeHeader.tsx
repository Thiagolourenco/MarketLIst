import { useSession } from "@/core/hooks/useSession";
import { supabase } from "@/core/lib/supabase";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function HomeHeader() {
  const { session } = useSession();
  const [profileName, setProfileName] = useState<string | null>(null);

  // Buscar nome da tabela user_profiles como fallback
  // Esta busca é opcional - se falhar, usamos o fallback do email
  useEffect(() => {
    // Só busca se não tiver nome no metadata
    if (
      session?.user?.id &&
      !session?.user?.user_metadata?.name &&
      !session?.user?.user_metadata?.full_name
    ) {
      // Usa async/await com try/catch para tratamento de erro
      const fetchProfileName = async () => {
        try {
          const { data, error } = await supabase
            .from("user_profiles")
            .select("name, full_name")
            .eq("id", session.user.id)
            .single();

          // Se não houver erro e tiver dados, salva o nome
          if (!error && data) {
            setProfileName(data.name || data.full_name || null);
          }
          // Se houver erro (RLS, tabela não existe, etc), ignora silenciosamente
          // O fallback do email será usado
        } catch {
          // Erro de rede ou outro - ignora; usamos fallback do email
        }
      };

      fetchProfileName();
    } else {
      // Se já tem nome no metadata, limpa o profileName
      setProfileName(null);
    }
  }, [session?.user?.id, session?.user?.user_metadata]);

  // Get user name from session metadata or profile table
  // Prioriza: metadata name -> metadata full_name -> profile name -> email (sem @) -> 'User'
  const getUserName = () => {
    const metadata = session?.user?.user_metadata;
    const email = session?.user?.email;

    // 1. Tenta pegar do metadata primeiro
    const metadataName = metadata?.name || metadata?.full_name;
    if (metadataName && metadataName.trim()) {
      return metadataName.trim();
    }

    // 2. Tenta pegar da tabela user_profiles
    if (profileName && profileName.trim()) {
      return profileName.trim();
    }

    // 3. Fallback: pega parte do email antes do @ e capitaliza
    if (email) {
      const emailPart = email.split("@")[0];
      // Capitaliza primeira letra
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }

    return "User";
  };

  const userName = getUserName();

  // Get user avatar URL from metadata
  const avatarUrl =
    session?.user?.user_metadata?.avatar_url ||
    session?.user?.user_metadata?.picture ||
    null;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    // Good Night: 22h (10 PM) até 5h (5 AM)
    if (hour >= 22 || hour < 5) return "Good Night";
    // Good Morning: 5h até 12h (noon)
    if (hour < 12) return "Good Morning";
    // Good Afternoon: 12h até 18h (6 PM)
    if (hour < 18) return "Good Afternoon";
    // Good Evening: 18h até 22h (10 PM)
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{getGreeting()},</Text>
        <Text style={styles.userNameText}>{userName}</Text>
      </View>

      <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
            contentFit="cover"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },
  userNameText: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: "#1F2925",
  },
  avatarButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.002)",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontFamily: "Liberation Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    color: "#6B7280",
  },
});
