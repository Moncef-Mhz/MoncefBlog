import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [2, 3, false] }],
  // [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ align: [] }],

  ["clean"], // remove formatting button
];

type RichTextType = {
  placeholder: string;
  onChange: any;
  value: string;
};

const RichText: React.FC<RichTextType> = ({ placeholder, onChange, value }) => {
  return (
    <ReactQuill
      id="content"
      theme="snow"
      value={value}
      className="text-black min-h-[200px] bg-white placeholder:text-white rounded-md"
      onChange={onChange}
      placeholder={placeholder}
      modules={{ toolbar: toolbarOptions }}
    />
  );
};

export default RichText;
