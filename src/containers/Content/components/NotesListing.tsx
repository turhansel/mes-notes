import React from "react";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import { NoteCard } from "@/containers/Content/components/NoteCard";
import { useRouter } from "next/router";
import { NoteEditor } from "./NoteEditor";

const NotesListing: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const topicId = router.query.topicId as string;

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: topicId ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && !topicId,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="col-span-3 flex flex-col">
      {notes?.map((note) => (
        <div key={note.id} className="">
          <NoteCard
            note={note}
            onDelete={() => void deleteNote.mutate({ id: note.id })}
          />
        </div>
      ))}

      <NoteEditor
        onSave={({ title, content }) => {
          void createNote.mutate({
            title,
            content,
            topicId,
          });
        }}
      />
    </div>
  );
};

export default NotesListing;
