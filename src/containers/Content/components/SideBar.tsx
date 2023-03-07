import Button from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import TopicListing from "@/containers/Content/components/TopicListing";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const SideBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
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
        const firstTopic = topics[0];
        !!topics.length && void router.push(`/notes/${firstTopic?.id ?? ""}`);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTopic.mutate({
        title: e.currentTarget.value,
      });
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e.currentTarget.value ", e.currentTarget.value);
    createTopic.mutate({
      title: e.currentTarget.value as string,
    });
    e.currentTarget.value = "";
  };

  const loading = isLoadingTopics || isFetchingTopics;

  return (
    <div className="col-span-1">
      <form className="relative" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="New Topic"
          name="topic"
          className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onKeyDown={handleKeyDown}
        />
        <Button
          className="absolute right-2 top-1.5 rounded border-gray-200 bg-primary p-1 text-sm text-white"
          type="submit"
        >
          Create
        </Button>
      </form>

      <TopicListing topics={topics} loading={loading} />
    </div>
  );
};

export default SideBar;
