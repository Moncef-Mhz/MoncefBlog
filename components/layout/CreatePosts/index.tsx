// "use client";

import React, { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SelectInput from "@/components/ui/Select";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import "react-quill/dist/quill.snow.css";
import useSWR from "swr";
import { Slugify } from "@/utils/Slugify";

type Tag = {
  _id: string;
  name: string;
};
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: [2, 3, false] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ align: [] }],

  ["clean"], // remove formatting button
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Dynamically import ReactQuill to prevent SSR issues

const CreatePostClient = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("Moncef");
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { data: tags, error } = useSWR<Tag[]>("/api/tags", fetcher);

  const SubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content || !description || !author || !tag || !image) {
      alert("Please enter all required fields");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug: Slugify(title),
          author,
          description,
          content,
          image,
          tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Post created successfully");
        setTitle("");
        setContent("");
        setImage("");
        setTag("");
        setDescription("");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the post");
    }
  };
  return (
    <>
      {title ? (
        <h1 className=" font-bold capitalize">{title}</h1>
      ) : (
        <h1 className="font-bold">[Untiteld]</h1>
      )}
      <hr />
      <form
        onSubmit={(e) => SubmitHandler(e)}
        className="lg:grid mt-4 lg:grid-cols-3 w-full gap-5 flex flex-col"
      >
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Input
            varient="default"
            placeholder="Title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <div>
            <Input
              varient="textarea"
              placeholder="Description"
              type="textarea"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              min={50}
              max={100}
            />
          </div>
          <ReactQuill
            id="content"
            theme="snow"
            value={content}
            className="text-black outline-none border-0 bg-white placeholder:text-white rounded-md"
            onChange={setContent}
            placeholder={"Start typing your post from here!"}
            modules={{ toolbar: toolbarOptions }}
          />
        </div>
        <div className="lg:col-span-1 lg:border-l lg:px-5 space-y-5">
          <SelectInput
            label="Tag"
            selectedValue={tag}
            onChange={(e) => setTag(e.target.value)}
            options={tags || []}
          />
          <Input
            placeholder="Author"
            varient="default"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            label="Author"
            min={3}
          />
          <div>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
              onSuccess={(res: CloudinaryUploadWidgetResults, { widget }) => {
                if (res.info && typeof res.info === "object") {
                  setImage(res.info.url);
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <Button
                  variant="default"
                  className="bg-zinc-900 text-white"
                  rounded="full"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  Upload Image
                </Button>
              )}
            </CldUploadWidget>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-full aspect-square object-cover mt-2"
              />
            )}
          </div>
          <button
            type="submit"
            className="lg:col-span-3 bg-blue-500 max-w-xs text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePostClient;
