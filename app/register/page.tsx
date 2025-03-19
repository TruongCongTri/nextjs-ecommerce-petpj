import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-muted p-6 lg:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm />
      </div>
    </div>
  );
}
