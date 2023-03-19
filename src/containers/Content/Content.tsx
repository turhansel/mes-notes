import React from "react";
import SideBar from "@/containers/Content/components/SideBar";
import NotesListing from "@/containers/Content/components/NotesListing";
import AddTopicForm from "./components/AddTopicForm";
import useWindowSize from "@/hooks/useWindowSize";

const Content: React.FC = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="h-screen w-full p-2 md:p-0">
      {isMobile && <AddTopicForm />}
      <div className="mt-4 grid max-w-screen-xl grid-cols-12 justify-between gap-4 sm:grid-cols-4 xl:mx-auto h-full">
        <div className="relative col-span-1 sm:col-span-1 ">
          <SideBar />
        </div>

        <div className="col-span-11 flex flex-col sm:col-span-3">
          <NotesListing />
        </div>
      </div>
    </div>
  );
};

export default Content;
