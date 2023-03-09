import Button from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import TopicListing from "@/containers/Content/components/TopicListing";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Balancer from "react-wrap-balancer";

const schema = z.object({
  title: z.string().min(1, { message: "Required" }).max(30),
});

const SideBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
    onSettled(data) {
      void router.push(`/notes/${data?.id ?? ""}`);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ title }) => {
    createTopic.mutate({
      title: title as string,
    });
    reset();
  };

  const loading = isLoadingTopics || isFetchingTopics;

  return (
    <div className="col-span-1">
      <form
        className="relative"
        onSubmit={
          handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <Input
          type="text"
          id="title"
          placeholder="New Topic"
          {...register("title")}
          aria-invalid={errors.name ? "true" : "false"}
          className={`focus:ring-2 focus:ring-offset-2 ${
            !!errors.title ? "focus:ring-red-200" : "focus:ring-primary"
          }}`}
        />
        <Button
          className="absolute right-2 top-1.5 rounded border-gray-200 bg-primary p-1 text-sm text-white"
          type="submit"
        >
          Create
        </Button>
        {!!errors.title && (
          <Balancer className="mt-2 p-2 text-red-500">
            * {errors.title.message as string}
          </Balancer>
        )}
      </form>

      <TopicListing topics={topics} loading={loading} />
    </div>
  );
};

export default SideBar;
