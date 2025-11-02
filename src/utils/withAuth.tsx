"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function withAuth(Component: any) {
  return function ProtectedPage(props: any) {
    const { authUser } = useSelector((state: any) => state.auth);
    const router = useRouter();

    console.log(authUser, "ini user");

    useEffect(() => {
      if (!authUser) {
        router.replace("/login");
      }
    }, [authUser, router]);

    if (!authUser) return null;

    return <Component {...props} />;
  };
}
