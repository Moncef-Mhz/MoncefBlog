"use client";
import Input from "@/components/ui/Input";
import SelectInput from "@/components/ui/Select";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import RichText from "@/components/ui/RichText";
import { Slugify } from "@/utils/Slugify";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Button from "@/components/ui/Button";
import useSWR from "swr";

type tags = {
  _id: string;
  name: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("Moncef");
  const [tag, setTag] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { data: tags, isLoading } = useSWR<tags[]>("/api/tags", fetcher);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {title ? (
        <h1 className="text-6xl font-bold capitalize m-0">{title}</h1>
      ) : (
        <h1 className="text-6xl font-bold m-0">[Untitled]</h1>
      )}
      <hr className="my-6" />
      <form
        className="lg:grid lg:grid-cols-3 w-full gap-5 flex flex-col"
        onSubmit={(e) => SubmitHandler(e)}
      >
        <div className=" space-y-5 lg:col-span-2 ">
          <Input
            placeholder="New Title"
            varient="default"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=""
            type="text"
            label="Title"
            min={3}
          />

          <Input
            placeholder="New Title"
            varient="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=""
            type="text"
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
            options={tags ? tags : []}
          />
          <Input
            placeholder="Author"
            varient="default"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className=""
            type="text"
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
              {({ open }) => {
                return (
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
                );
              }}
            </CldUploadWidget>
            <img src={image} alt="" className="w-full" />
          </div>
        </div>
        <button onSubmit={(e) => SubmitHandler(e)}>submit</button>
      </form>
    </>
  );
};

export default NewPost;
