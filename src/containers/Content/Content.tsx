import React from "react";
import SideBar from "@/containers/Content/components/SideBar";
import NotesListing from "@/containers/Content/components/NotesListing";
import useWindowSize from "@/hooks/useWindowSize";
import { ChevronRight } from "lucide-react";
import AddTopicForm from "./components/AddTopicForm";

const Content: React.FC = () => {
  const { isMobile, isDesktop } = useWindowSize();

  return (
    <div className="h-screen w-full p-2 md:p-0">
      {isMobile && <AddTopicForm />}
      <div className="mt-4 grid max-w-screen-xl grid-cols-12 justify-between gap-4 sm:grid-cols-4 md:mt-16 xl:mx-auto">
        <div className="relative col-span-1 sm:col-span-1 ">
          {isDesktop && <SideBar />}
          {isMobile && (
            <button className="h-full rounded-md bg-blue-200 ">
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="col-span-11 flex flex-col sm:col-span-3">
          <NotesListing />
        </div>
      </div>
    </div>
  );
};

export default Content;
