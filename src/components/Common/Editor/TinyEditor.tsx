import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyProps {
  changeBody: (data: any) => void;
  defaultValue: string;
}
export default function TinyEditor({ changeBody, defaultValue }: TinyProps) {
  const editorRef = useRef<any>();

  useEffect(() => {
    editorRef.current = '';
  }, [defaultValue]);

  return (
    <>
      <Editor
        apiKey="jvnq0huwvxzja1sev6byqabo1g6qc276no4top15pw2m6odd"
        onInit={(evt, editor) => {
          editorRef.current = editor;
          console.log(evt.type);
        }}
        onEditorChange={(e) => {
          console.log(e);

          changeBody(e);
        }}
        value={defaultValue}
        init={{
          height: 500,
          menubar: false,
          image_title: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
            'textcolor',
            'code'
          ],
          toolbar:
            'undo redo | blocks |' +
            'forecolor | backcolor |' +
            'sizeselect | bold italic forecolor | link | alignleft aligncenter |' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'image | ' +
            'removeformat | code | help',
          fontsize_formats:
            '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
          content_style:
            'body { font-family:Montserrat,sans-serif; font-size:14px }',

          file_picker_callback: function (cb, value, meta) {
            console.log(value, meta);

            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function () {
              var file = (this as HTMLInputElement).files?.[0];
              if (file) {
                var reader = new FileReader();
                reader.onload = function () {
                  var id = 'blobid' + new Date().getTime();
                  var blobCache = editorRef.current.editorUpload.blobCache;
                  var base64 = (reader.result as string).split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file?.name });
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }
        }}
      />
    </>
  );
}
