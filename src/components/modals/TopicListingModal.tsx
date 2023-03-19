import Modal from "@/components/shared/Modal";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from "react";
import TopicListing from "@/containers/Content/components/TopicListing";
import { Topic } from "@prisma/client";

interface TopicListingModalProps {
  showTopicListingModal: boolean;
  setShowTopicListingModal: Dispatch<SetStateAction<boolean>>;
  topics?: Topic[];
}

const TopicListingModal: React.FC<TopicListingModalProps> = ({
  showTopicListingModal,
  setShowTopicListingModal,
  topics,
}) => {
  return (
    <Modal
      showModal={showTopicListingModal}
      setShowModal={setShowTopicListingModal}
    >
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <TopicListing
          topics={topics}
          onSelectTopic={() => setShowTopicListingModal(false)}
        />
      </div>
    </Modal>
  );
};

export function useTopicListingModal({ topics }: { topics?: Topic[] }) {
  const [showTopicListingModal, setShowTopicListingModal] = useState(false);

  const TopicListingModalCallback = useCallback(() => {
    return (
      <TopicListingModal
        topics={topics}
        showTopicListingModal={showTopicListingModal}
        setShowTopicListingModal={setShowTopicListingModal}
      />
    );
  }, [showTopicListingModal, setShowTopicListingModal]);

  return useMemo(
    () => ({
      showTopicListingModal,
      setShowTopicListingModal,
      TopicListingModal: TopicListingModalCallback,
    }),
    [setShowTopicListingModal, TopicListingModalCallback]
  );
}
