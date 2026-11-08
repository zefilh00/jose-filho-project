export function validateRegister({ displayName, email, password, confirmPassword }) {
  if (!displayName.trim()) {
    return "Informe seu nome de exibição.";
  }

  if (!email.trim()) {
    return "Informe seu e-mail.";
  }

  if (password.length < 8) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }

  if (password !== confirmPassword) {
    return "As senhas não coincidem.";
  }

  return null;
}

export function getAuthErrorMessage(error) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }

  if (message.includes("user already registered")) {
    return "Este e-mail já possui uma conta.";
  }

  if (message.includes("password should be at least")) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }

  if (message.includes("email not confirmed")) {
    return "Seu e-mail ainda não foi confirmado.";
  }

  if (message.includes("rate limit")) {
    return "Muitas tentativas. Aguarde um pouco e tente novamente.";
  }

  return "Não foi possível concluir a operação. Tente novamente.";
}
