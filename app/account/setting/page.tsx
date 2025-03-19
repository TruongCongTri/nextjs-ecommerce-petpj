import AddressForm from "@/components/forms/accounts/AddressForm";
import ChangePasswordForm from "@/components/forms/accounts/ChangePasswordForm";
import ProfileForm from "@/components/forms/accounts/ProfileForm";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingPage() {
  return (
    <div className="basis-full lg:basis-3/4 space-y-6">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>
        <TabsContent value="address">
          <AddressForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
