import React from "react";
import { type Topic } from "@prisma/client";
import LoadingSpinner from "@/components/shared/icons/LoadingSpinner";
import TopicItem from "./TopicItem";

const TopicListing: React.FC<{
  topics?: Topic[];
  loading?: boolean;
  onSelectTopic?: () => void;
}> = ({ topics, loading, onSelectTopic }) => {
  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-2 max-h-[70vh] overflow-auto rounded-md border border-blue-300 p-2">
      <ul className="w-full">
        {topics?.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onSelectTopic={onSelectTopic}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopicListing;
