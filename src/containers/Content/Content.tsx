import React from "react";
import SideBar from "@/containers/Content/components/SideBar";
import NotesListing from "@/containers/Content/components/NotesListing";

const Content: React.FC = () => {
  return (
    <div className="h-screen w-full p-2 md:p-0">
      <div className="mt-4 grid max-w-screen-xl grid-cols-4 justify-between gap-4 md:mt-16 xl:mx-auto">
        <SideBar />

        <NotesListing />
      </div>
    </div>
  );
};

export default Content;
