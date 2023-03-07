import Layout from "@/components/layout";
import LoadingSpinner from "@/components/shared/icons/LoadingSpinner";
import Content from "@/containers/Content/Content";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TopicDetail: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  useEffect(() => {
    if (!sessionData && !loading) void router.replace("/");
  }, [loading, router, sessionData, status]);

  if (loading)
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

export default TopicDetail;
