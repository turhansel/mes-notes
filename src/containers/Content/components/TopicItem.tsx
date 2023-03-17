import { api } from "@/lib/utils/api";
import { type Topic } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TopicItem: React.FC<{ topic: Topic }> = ({ topic }) => {
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const isSelected = topicId === topic.id;

  const handleRemove = (id: string) => {
    console.log("id", id);
  };

  return (
    <Link href={`/notes/${topic.id}`}>
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
            handleRemove(topic.id);
          }}
        >
          <Trash2 className="h-5 w-5 text-red-500" />
        </button>
      </li>
    </Link>
  );
};

export default TopicItem;
