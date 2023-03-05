import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "@/lib/utils/api";
import { Input } from "@/components/shared/Input";
import { NoteEditor } from "@/containers/Content/NoteEditor";
import { NoteCard } from "@/containers/Content/NoteCard";

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTopic.mutate({
        title: e.currentTarget.value,
      });
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="mt-5 grid max-w-screen-xl grid-cols-4 justify-between gap-4 xl:mx-auto">
        <div className="col-span-1">
          <Input
            type="text"
            placeholder="New Topic"
            className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onKeyDown={handleKeyDown}
          />

          <ul className="w-56 p-2">
            {topics?.map((topic) => (
              <li key={topic.id}>
                <a
                  href="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setSelectedTopic(topic);
                  }}
                >
                  {topic.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3">
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
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
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
