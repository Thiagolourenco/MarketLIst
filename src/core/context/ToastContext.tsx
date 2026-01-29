import React, { createContext, useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Toast, ToastConfig } from "../ui/Toast";

interface ToastContextValue {
  showToast: (config: ToastConfig) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ToastConfig>({ message: "" });

  const showToast = useCallback((toastConfig: ToastConfig) => {
    setConfig((prev) => ({ ...prev, ...toastConfig }));
    setVisible(true);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => {
      showToast({ message, type: "success", duration });
    },
    [showToast],
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      showToast({ message, type: "error", duration: duration ?? 5000 });
    },
    [showToast],
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      showToast({ message, type: "info", duration });
    },
    [showToast],
  );

  const handleHide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      <View style={styles.wrapper} pointerEvents="box-none">
        {children}
        <Toast
          message={config.message}
          type={config.type}
          duration={config.duration}
          visible={visible}
          onHide={handleHide}
        />
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
