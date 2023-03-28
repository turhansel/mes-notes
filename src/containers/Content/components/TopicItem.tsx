import { api } from "@/lib/utils/api";
import { type Topic } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TopicItem: React.FC<{
  topic: Topic;
  onSelectTopic?: () => void;
}> = ({ topic, onSelectTopic }) => {
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const isSelected = topicId === topic.id;

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      router.push(`/notes`);
    },
  });

  const handleDelete = (id: string) => {
    deleteTopic.mutate({ id });
  };

  return (
    <Link href={`/notes/${topic.id}`} onClick={onSelectTopic && onSelectTopic}>
      <li
        key={topic.id}
        className={`flex items-center justify-between rounded-md p-4 ${
          isSelected ? "bg-orange-300" : undefined
        }`}
      >
        <span>{topic.title}</span>
        <button
          type="button"
          className="text-red-500"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(topic.id);
          }}
        >
          <Trash2 className="h-5 w-5 text-red-500" />
        </button>
      </li>
    </Link>
  );
};

export default TopicItem;
