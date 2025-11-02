"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";
import NProgress from "nprogress";

interface LoadingProviderProps {
  children: ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip NProgress saat render pertama
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
}
