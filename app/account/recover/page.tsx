import { RecoverForm } from "components/account/recover-form";

export const metadata = {
  title: "Reset Password",
  description: "Reset your account password.",
};

export default function RecoverPage() {
  return (
    <div className="main-container py-20">
      <RecoverForm />
    </div>
  );
}
