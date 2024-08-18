"use client";

import styles from "@/app/page.module.scss";
import RTE, { getUpdatedContent } from "@/app/components/RTE";
import { Button, CloseButton, Input } from "@mantine/core";
import { useState } from "react";
import updatePostData from "@/lib/Posts/updatePostData";

type Props = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export default function PostEditor({ slug, title, date, content }: Props) {
  const [value, setValue] = useState(title);

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const saveToFile = async () => {
    const updatedContent = getUpdatedContent();
    if (!updatedContent) {
      console.log("No content update yet.");
      return;
    }

    try {
      await updatePostData(slug, {
        id: slug,
        title: title,
        date: date,
        contentHtml: updatedContent,
      });
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className={styles.postEditorWrapper}>
      <div>
        <Input.Wrapper label="Edit the blog post title">
          <Input
            value={value}
            placeholder="Type a new title ..."
            onChange={updateTitle}
            rightSectionPointerEvents="all"
            mt="md"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
        </Input.Wrapper>
      </div>
      <div className="mt-3">
        <RTE content={content}></RTE>
      </div>
      <div className={styles.postEditorActions + " mt-4"}>
        <Button onClick={() => saveToFile()}>Save to file</Button>
      </div>
    </div>
  );
}
