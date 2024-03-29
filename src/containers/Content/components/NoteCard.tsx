import { type Note } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/Accordion";

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  return (
    <div className="group mb-5 border border-gray-200 shadow-xl">
      <div className="m-0 p-3">
        <Accordion type="single" collapsible>
          <AccordionItem value={note.id}>
            <AccordionTrigger>{note.title}</AccordionTrigger>
            <AccordionContent>
              <article className="prose lg:prose-lg">
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </article>
              <div className="mx-2 flex justify-end">
                <button
                  className="invisible px-5 group-hover:visible"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
