// src/components/ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IonToast } from "@ionic/react";

interface ToastContextType {
  showToast: (message: string, color?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("primary");
  const [duration, setDuration] = useState(2000);

  const showToast = (msg: string, clr: string = "primary", dur: number = 2000) => {
    setMessage(msg);
    setColor(clr);
    setDuration(dur);
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <IonToast
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        message={message}
        duration={duration}
        color={color}
        buttons={[{
          text: "OK",
          role: "cancel",
        }]}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
