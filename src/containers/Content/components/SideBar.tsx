import Button from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import TopicListing from "@/containers/Content/components/TopicListing";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AddTopicForm from "./AddTopicForm";

const SideBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const {
    data: topics,
    refetch: refetchTopics,
    isLoading: isLoadingTopics,
    isFetching: isFetchingTopics,
  } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (topics) => {
        const firstTopicId = topics[0]?.id;
        void router.push(`/notes/${topicId ?? firstTopicId ?? ""}`);
      },
    }
  );

  const loading = isLoadingTopics || isFetchingTopics;

  return (
    <>
      <AddTopicForm />
      <TopicListing topics={topics} loading={loading} />
    </>
  );
};

export default SideBar;
