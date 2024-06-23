"use client";
import Input from "@/components/ui/Input";
import SelectInput from "@/components/ui/Select";
import React, { FormEvent, useState } from "react";
import RichText from "@/components/ui/RichText";
import { Slugify } from "@/utils/Slugify";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Button from "@/components/ui/Button";
import useSWR from "swr";

type Tag = {
  _id: string;
  name: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewPostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("Moncef");
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { data: tags, error } = useSWR<Tag[]>("/api/tags", fetcher);

  const submitHandler = async (e: FormEvent) => {
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
        // alert("Post created successfully");
        setTitle("");
        setContent("");
        setImage("");
        setTag("");
        setDescription("");
      }
    } catch (err) {
      //   alert("An error occurred while creating the post");
    }
  };

  if (error) {
    return <div>Failed to load tags</div>;
  }

  return (
    <form
      className="lg:grid lg:grid-cols-3 w-full gap-5 flex flex-col"
      onSubmit={submitHandler}
    >
      <div className="space-y-5 lg:col-span-2">
        <Input
          placeholder="New Title"
          varient="default"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          min={3}
        />

        <Input
          placeholder="New Description"
          varient="textarea"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          min={3}
        />

        <RichText
          placeholder="Start typing your post from here!"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="col-span-1 lg:border-l lg:px-5 space-y-5">
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
          {image && <img src={image} alt="Uploaded" className="w-full mt-2" />}
        </div>
      </div>
      <button
        type="submit"
        className="lg:col-span-3 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default NewPostPage;
