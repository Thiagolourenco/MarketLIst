import { SignUpView } from "@/features/auth/view";
import { useEffect } from "react";

export default function SignUpScreen() {
  useEffect(() => {
    (async () => {
      try {
        const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
        const r = await fetch(
          "https://hwtqognmvygeuyjmmzhw.supabase.co/auth/v1/health",
          { headers: { apikey: key, Authorization: `Bearer ${key}` } },
        );
        console.log("health:", r.status, await r.text());
      } catch (e) {
        console.log("health error:", e);
      }
    })();
  }, []);

  return <SignUpView />;
}
