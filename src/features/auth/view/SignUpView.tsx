import { useToast } from "@/core/context/ToastContext";
import { Button, Input, Typography } from "@/core/ui";
import {
  AppleIcon,
  ChefHatIcon,
  EmailIcon,
  EyeIcon,
  GoogleIcon,
  LockIcon,
  ProfileIcon,
} from "@/core/ui/icons";
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

export function SignUpView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, isLoading, error } = useAuthVM();
  const [localError, setLocalError] = useState<string | null>(null);
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        const msg = "As senhas não coincidem.";
        setLocalError(msg);
        toast.error(msg);
        return;
      }
      setLocalError(null);
      const result = await signUp(name, email, password);
      if (result.success) {
        toast.success("Conta criada com sucesso!");
        router.replace("/");
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      // setIsLoading(false);
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
          {/* Back Arrow */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Typography variant="body" style={styles.backArrow}>
              ←
            </Typography>
          </TouchableOpacity>

          {/* Chef Hat Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <ChefHatIcon width={32} height={32} color="#22C55E" />
            </View>
          </View>

          {/* Welcome Message */}
          <Typography variant="title" style={styles.welcomeTitle}>
            Create Account
          </Typography>
          <Typography variant="description" style={styles.subtitle}>
            Sign up to start your meal planning journey.
          </Typography>

          {/* Input Fields */}
          <View style={styles.inputsContainer}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              leftIcon={<ProfileIcon />}
              error={
                error?.toLowerCase().includes("nome") ||
                error?.toLowerCase().includes("name")
                  ? error
                  : localError?.toLowerCase().includes("nome") ||
                      localError?.toLowerCase().includes("name")
                    ? localError
                    : undefined
              }
            />

            <Input
              label="Email Address"
              placeholder="hello@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<EmailIcon />}
              error={
                error?.toLowerCase().includes("email")
                  ? error
                  : localError?.toLowerCase().includes("email")
                    ? localError
                    : undefined
              }
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password-new"
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={
                error?.toLowerCase().includes("senha") ||
                error?.toLowerCase().includes("password")
                  ? error
                  : localError?.toLowerCase().includes("senha") ||
                      localError?.toLowerCase().includes("password")
                    ? localError
                    : undefined
              }
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoComplete="password-new"
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              error={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
            />
          </View>

          {/* Sign Up Button */}
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            disabled={
              isLoading ||
              !name ||
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }
            activeIndicator={isLoading}
            style={styles.signUpButton}
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

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Typography variant="caption" style={styles.signInText}>
              Already have an account?{" "}
            </Typography>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-in")}
              activeOpacity={0.7}
            >
              <Typography variant="caption" style={styles.signInLink}>
                Sign In
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
  signUpButton: {
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
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: "#6B7280",
  },
  signInLink: {
    color: "#34C759",
    fontWeight: "600",
  },
});
