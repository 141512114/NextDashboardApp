"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.scss";
import RTE, { getUpdatedContent } from "@/app/components/RTE";
import {
  Button,
  CloseButton,
  Fieldset,
  TextInput,
  Tooltip,
} from "@mantine/core";
import updatePostData from "@/lib/Posts/updatePostData";

type Props = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export default function PostEditor({ slug, title, date, content }: Props) {
  const router = useRouter();

  const [newSlug, setNewSlug] = useState(slug);
  const [errorSlug, setErrorSlug] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [focused, setFocused] = useState(false);

  const updateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSlug(e.target.value);
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const saveToFile = async () => {
    setFocused(false);
    setErrorSlug(false);

    const updatedContent = getUpdatedContent();

    let new_post_slug = slug;
    if (newSlug && newSlug !== "") {
      if (newSlug.includes(" ")) {
        setErrorSlug(true);
        return;
      } else {
        new_post_slug = newSlug.toLowerCase();
      }
    }

    let new_post_title = title;
    if (newTitle && newTitle !== "") {
      new_post_title = newTitle;
    }

    try {
      const update: BlogPost = {
        id: new_post_slug,
        title: new_post_title,
        date: date,
        contentHtml: updatedContent,
      };

      await updatePostData(slug, update);
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      return false;
    }

    router.push(`/posts/${new_post_slug}/edit`);
  };

  return (
    <div className={styles.postEditorWrapper}>
      <form
        className="form"
        method="post"
        onSubmit={async (event: any) => {
          event?.preventDefault();
          await saveToFile();
        }}
      >
        <Fieldset legend="Post metadata">
          <TextInput
            label="Edit the blog post id"
            value={newSlug}
            name="blog_post_id"
            placeholder="Type a new id ..."
            onChange={updateSlug}
            mt="md"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            inputContainer={(children) => (
              <Tooltip
                label="The id has to be in lowercase and must not contain spaces."
                position="top-start"
                opened={focused}
              >
                {children}
              </Tooltip>
            )}
            error={errorSlug ? "The specified id is invalid." : ""}
            required
          />
          <TextInput
            label="Edit the blog post title"
            value={newTitle}
            name="blog_post_title"
            placeholder="Type a new title ..."
            onChange={updateTitle}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setNewTitle("")}
                style={{ display: newTitle ? undefined : "none" }}
              />
            }
            required
          />
        </Fieldset>
        <div className="mt-3">
          <RTE content={content}></RTE>
        </div>
        <div className={styles.postEditorActions + " mt-4"}>
          <Button className="btn btn-success" type="submit">
            Save to file
          </Button>
        </div>
      </form>
    </div>
  );
}
