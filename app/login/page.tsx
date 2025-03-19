import React from "react";
import LoginForm from "@/components/forms/LoginForm";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-muted p-6 lg:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
