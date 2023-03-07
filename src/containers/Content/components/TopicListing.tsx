import React from "react";
import { type Topic } from "@prisma/client";
import LoadingSpinner from "@/components/shared/icons/LoadingSpinner";
import TopicItem from "./TopicItem";

const TopicListing: React.FC<{ topics?: Topic[]; loading: boolean }> = ({
  topics,
  loading,
}) => {
  if (loading) return <LoadingSpinner />;

  return (
    <ul className="w-56 p-2">
      {topics?.map((topic) => {
        return <TopicItem key={topic.id} topic={topic} />;
      })}
    </ul>
  );
};

export default TopicListing;
