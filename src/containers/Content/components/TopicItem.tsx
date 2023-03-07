import { type Topic } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TopicItem: React.FC<{ topic: Topic }> = ({ topic }) => {
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const isSelected = topicId === topic.id;
  return (
    <li key={topic.id} className={isSelected ? "bg-primary" : ""}>
      <Link href={`/notes/${topic.id}`}>{topic.title}</Link>
    </li>
  );
};

export default TopicItem;
