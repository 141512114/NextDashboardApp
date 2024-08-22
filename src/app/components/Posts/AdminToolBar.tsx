"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Center, Modal } from "@mantine/core";
import CreateNewBlogPost from "@/app/components/Modals/CreateNewBlogPost";

export default function AdminToolBar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <div className="toolbar my-4">
      <Center>
        <Button color="green" type="button" onClick={toggle}>
          Create new post
        </Button>
      </Center>
      <Modal
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
        title="Create a new blog post"
      >
        <CreateNewBlogPost></CreateNewBlogPost>
      </Modal>
    </div>
  );
}
