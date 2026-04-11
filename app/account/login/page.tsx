import { LoginForm } from "components/account/login-form";

export const metadata = {
  title: "Login",
  description: "Login to your account.",
};

export default function LoginPage() {
  return (
    <div className="main-container py-20">
      <LoginForm />
    </div>
  );
}
