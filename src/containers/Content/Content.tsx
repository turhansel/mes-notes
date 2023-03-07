import React from "react";
import SideBar from "@/containers/Content/components/SideBar";
import NotesListing from "@/containers/Content/components/NotesListing";

const Content: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <div className="mt-16 grid max-w-screen-xl grid-cols-4 justify-between gap-4 xl:mx-auto">
        <SideBar />

        <NotesListing />
      </div>
    </div>
  );
};

export default Content;
