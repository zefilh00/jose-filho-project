import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import AuthInput from "./AuthInput";

export default function PasswordInput({ label = "Senha", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      {...props}
      label={label}
      icon={LockKeyhole}
      type={visible ? "text" : "password"}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="text-gray-500 hover:text-white transition-colors"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
