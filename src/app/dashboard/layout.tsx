import React from "react";
import { ThemedLayout } from "@refinedev/mui";
import { Header } from "@components/header";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, redirectTo } = await authProviderServer.check();

  if (!authenticated) {
    return redirect(redirectTo ?? "/login");
  }

  return <ThemedLayout Header={Header}>{children}</ThemedLayout>;
}
