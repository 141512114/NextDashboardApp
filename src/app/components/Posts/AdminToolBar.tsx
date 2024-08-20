"use client";

import createPost from "@/lib/Posts/createPost";
import { Button } from "@mantine/core";

export default function AdminToolBar() {
  const createNewPost = async () => {
    try {
      await createPost({
        id: "test-post",
        title: "Test-Post",
        date: "2024-08-22",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  };

  return (
    <div className="toolbar mb-4">
      <Button
        className="btn btn-success"
        type="button"
        onClick={() => createNewPost()}
      >
        Create new post
      </Button>
    </div>
  );
}
