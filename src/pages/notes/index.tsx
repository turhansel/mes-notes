"use client";

import Layout from "@/components/layout";
import LoadingSpinner from "@/components/shared/icons/LoadingSpinner";
import Content from "@/containers/Content/Content";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotesPage: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const [isUnauthenticated, loading] = [
    status === "unauthenticated",
    status === "loading",
  ];

  useEffect(() => {
    if (isUnauthenticated) void router.replace("/");
  }, [isUnauthenticated, router, sessionData]);

  if (loading || isUnauthenticated)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default NotesPage;
