"use client";

import { useRouter } from 'next/navigation';

// This hook provides a navigate function compatible with the signature used in authStore.ts (e.g., logout(navigate))
export const useNextRouterNavigate = () => {
  const router = useRouter();
  
  const navigate = (path: string) => {
    router.push(path);
  };
  
  return navigate;
};