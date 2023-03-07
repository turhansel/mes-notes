import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Input } from "../../components/shared/Input";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const extensions = [
    markdown({ base: markdownLanguage, codeLanguages: languages }),
  ];

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  const handleCreateNote = () => {
    onSave({
      title,
      content: code,
    });
    setCode("");
    setTitle("");
  };

  return (
    <div className="border border-gray-200 p-5 shadow-xl">
      <div>
        <h2>
          <Input
            type="text"
            placeholder="Note title"
            value={title}
            className="mb-4 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onChange={handleChangeTitle}
          />
        </h2>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={extensions}
          onChange={handleChangeCode}
          className="border border-gray-300"
        />
      </div>
      <div className="justify-end">
        <button
          onClick={handleCreateNote}
          className="text-primary"
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};
