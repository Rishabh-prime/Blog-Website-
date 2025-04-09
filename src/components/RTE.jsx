import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full font-[Georgia,serif]">
      {label && (
        <label className="inline-block mb-1 pl-1 text-[15px] text-[#5E503F] font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINY_KEY}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link",
                "charmap", "preview", "anchor", "searchreplace",
                "visualblocks", "code", "fullscreen", "insertdatetime",
                "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image link media | removeformat | preview code",
              content_style: `
                body {
                  background-color: #FAF3DD;
                  color: #403D39;
                  font-family: 'Georgia', serif;
                  font-size: 16px;
                  padding: 1rem;
                }
                a { color: #6C584C; }
                h1, h2, h3 { color: #5E503F; }
                ul, ol { margin-left: 1.5rem; }
                img { border-radius: 6px; }
              `,
              skin: "oxide",
              content_css: false, // we override using content_style
            }}
          />
        )}
      />
    </div>
  );
}
