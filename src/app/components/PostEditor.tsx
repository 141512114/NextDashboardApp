"use client";

import styles from "@/app/page.module.scss";
import RTE, { getUpdatedContent } from "@/app/components/RTE";
import { Button, CloseButton, Input } from "@mantine/core";
import { useState } from "react";

type Props = {
  title: string;
  content: string;
};

export default function PostEditor({ title, content }: Props) {
  const [value, setValue] = useState(title);

  const updateTitle = (e: any) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const saveToFile = () => {
    const updatedContent = getUpdatedContent();
    if (!updatedContent) {
      console.log("No content update yet.");
      return;
    }
    console.log(updatedContent);
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
