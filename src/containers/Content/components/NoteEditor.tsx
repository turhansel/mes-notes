import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Input } from "../../../components/shared/Input";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Required field" }).max(30),
  content: z.string().min(1, { message: "Required field" }),
});

type FormValues = {
  title: string;
  content: string;
};

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const extensions = [
    markdown({ base: markdownLanguage, codeLanguages: languages }),
  ];

  const onSubmit: SubmitHandler<FormValues> = ({ title, content }) => {
    onSave({
      title,
      content,
    });
    reset();
  };

  return (
    <form
      className="rounded-lg border border-gray-200 p-5 shadow-xl "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        id="title"
        placeholder="Note title"
        {...register("title")}
        className="mb-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
      />

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, onBlur, value } }) => (
          <CodeMirror
            width="100%"
            height="30vh"
            minWidth="100%"
            minHeight="30vh"
            extensions={extensions}
            value={value}
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            className="rounded-sm border border-gray-200"
          />
        )}
      />

      <div className="justify-end">
        <button
          type="submit"
          className="mt-2 rounded-md bg-primary p-2 text-white disabled:cursor-not-allowed"
          disabled={!isValid}
        >
          Save
        </button>
      </div>
    </form>
  );
};
