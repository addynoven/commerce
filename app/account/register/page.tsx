import { RegisterForm } from "components/account/register-form";

export const metadata = {
  title: "Register",
  description: "Create a new account.",
};

export default function RegisterPage() {
  return (
    <div className="main-container py-20">
      <RegisterForm />
    </div>
  );
}
