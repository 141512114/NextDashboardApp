"use client";

import { Button } from "@mantine/core";

export default function AdminToolBar() {
  const createNewPost = () => {
    console.log("Create a new post duh...");
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
