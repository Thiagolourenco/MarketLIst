import { useToast } from "@/core/context/ToastContext";
import { Button, Input, Typography } from "@/src/core/ui";
import {
  AppleIcon,
  ChefHatIcon,
  EmailIcon,
  EyeIcon,
  GoogleIcon,
  LockIcon,
} from "@/src/core/ui/icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthVM } from "../view-model/useAuthVM";

export function SignInView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading, error } = useAuthVM();
  const toast = useToast();

  const handleSignIn = async () => {
    const result = await signIn(email, password);
    if (result.success) {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => router.replace("/(app)/home"), 500);
    } else if (result.error) {
      console.log("result.error", result.error);
      toast.error(result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Chef Hat Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <ChefHatIcon width={32} height={32} color="#22C55E" />
            </View>
          </View>

          {/* Welcome Message */}
          <Typography variant="title" style={styles.welcomeTitle}>
            Welcome Back
          </Typography>
          <Typography variant="description" style={styles.subtitle}>
            Sign in to continue your meal planning.
          </Typography>

          {/* Input Fields */}
          <View style={styles.inputsContainer}>
            <Input
              label="Email Address"
              placeholder="hello@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<EmailIcon />}
              error={error?.toLowerCase().includes("email") ? error : undefined}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={
                error?.toLowerCase().includes("senha") ||
                error?.toLowerCase().includes("password")
                  ? error
                  : undefined
              }
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => router.push("/(auth)/forgot-password")}
              activeOpacity={0.7}
            >
              <Typography variant="caption" style={styles.forgotPassword}>
                Forgot Password?
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Log In Button */}
          <Button
            title="Log In"
            onPress={handleSignIn}
            disabled={isLoading || !email || !password}
            activeIndicator={isLoading}
            style={styles.loginButton}
          />

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Typography variant="caption" style={styles.orText}>
                Or continue with
              </Typography>
              <View style={styles.orLine} />
            </View>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <GoogleIcon width={20} height={21} />
                <Typography variant="body" style={styles.socialButtonLabel}>
                  Google
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <AppleIcon width={20} height={25} />
                <Typography variant="body" style={styles.socialButtonLabel}>
                  Apple
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Typography variant="caption" style={styles.signUpText}>
              Don&apos;t have an account?{" "}
            </Typography>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-up")}
              activeOpacity={0.7}
            >
              <Typography variant="caption" style={styles.signUpLink}>
                Sign Up
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF9",
    paddingTop: 60,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: "#6B7280",
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  welcomeTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 32,
    textAlign: "center",
    color: "#6B7280",
  },
  inputsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 8,
  },
  forgotPassword: {
    color: "#34C759",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    marginBottom: 24,
  },
  socialSection: {
    width: "100%",
    marginBottom: 32,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    textAlign: "center",
    color: "#6B7280",
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  socialButton: {
    width: 156.5,
    height: 50.61,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14.06,
    paddingHorizontal: 40.69,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    gap: 8,
  },
  socialButtonLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
    fontWeight: "500",
    fontFamily: "Nimbus Sans",
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: "#6B7280",
  },
  signUpLink: {
    color: "#34C759",
    fontWeight: "600",
  },
});
