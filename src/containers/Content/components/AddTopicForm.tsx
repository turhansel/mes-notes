import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import Balancer from "react-wrap-balancer";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AddTopicFormProps {}
interface FormValues {
  title: string;
}

const schema = z.object({
  title: z.string().min(1, { message: "Required" }).max(30),
});

const AddTopicForm: React.FC<AddTopicFormProps> = (props) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = ({ title }) => {
    createTopic.mutate({
      title: title as string,
    });
    reset();
  };

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
    onSettled(data) {
      void router.push(`/notes/${data?.id ?? ""}`);
    },
  });

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        id="title"
        placeholder="New Topic"
        {...register("title")}
        aria-invalid={errors.title ? "true" : "false"}
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
  );
};

export default AddTopicForm;
