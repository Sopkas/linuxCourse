type ToastOptions = {
  title?: string;
  description?: string;
};

export function toast({ title, description }: ToastOptions) {
  if (typeof window !== "undefined") {
    // Простая заглушка для уведомлений
    const message = [title, description].filter(Boolean).join(" — ");
    // eslint-disable-next-line no-alert
    window.alert(message || "Уведомление");
  } else {
    console.log("[toast]", title, description);
  }
}

export function useToast() {
  return { toast };
}
