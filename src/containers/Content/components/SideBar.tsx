import Button from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import TopicListing from "@/containers/Content/components/TopicListing";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import AddTopicForm from "./AddTopicForm";
import useWindowSize from "@/hooks/useWindowSize";
import { ChevronRight } from "lucide-react";
import { useTopicListingModal } from "@/components/modals/TopicListingModal";

const SideBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const { isMobile, isDesktop } = useWindowSize();

  const router = useRouter();
  const topicId = router.query.topicId as string;

  const {
    data: topics,
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

  const { setShowTopicListingModal, TopicListingModal, showTopicListingModal } =
    useTopicListingModal({
      topics,
    });

  return (
    <>
      <TopicListingModal />
      {isMobile && (
        <button
          type="button"
          className="h-full rounded-md bg-blue-200 "
          onClick={() => {
            setShowTopicListingModal(true);
          }}
          disabled={loading}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      {isDesktop && (
        <>
          <AddTopicForm />
          <TopicListing topics={topics} loading={loading} />
        </>
      )}
    </>
  );
};

export default SideBar;
