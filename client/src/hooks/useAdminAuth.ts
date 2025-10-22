import { trpc } from "@/lib/trpc";

/**
 * Hook to manage admin authentication state
 */
export function useAdminAuth() {
  const { data: admin, isLoading, error } = trpc.admin.me.useQuery();
  const logoutMutation = trpc.admin.logout.useMutation();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/admin";
  };

  return {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    error,
    logout,
  };
}

