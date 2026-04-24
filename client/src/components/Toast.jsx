import { useEffect } from "react";
import "../styles/toast.css";

export default function Toast({ message = "", onClose }) {

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return <div className="toast">{message}</div>;
}