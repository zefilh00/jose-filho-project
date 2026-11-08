import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  minLength,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          className="w-full rounded-xl border border-white/10 bg-[#080b18]/80 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
