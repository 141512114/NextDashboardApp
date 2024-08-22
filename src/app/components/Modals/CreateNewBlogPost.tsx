import createPost from "@/lib/Posts/createPost";
import {
  Button,
  Center,
  Group,
  Input,
  InputWrapper,
  TextInput,
  Tooltip,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import RTE, { getUpdatedContent } from "@/app/components/RTE";

export default function CreateNewBlogPost() {
  const [newSlug, setNewSlug] = useState("");
  const [errorSlug, setErrorSlug] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const [focused, setFocused] = useState(false);
  const [show, setShowNotification] = useState(false);

  const updateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSlug(e.target.value);
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const updateAuther = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(e.target.value);
  };

  const createNewPost = async () => {
    setFocused(false);
    setErrorSlug(false);
    setShowNotification(true);

    const updatedContent = getUpdatedContent();

    let new_post_slug = "";
    if (newSlug && newSlug !== "") {
      if (newSlug.includes(" ")) {
        setErrorSlug(true);
        return;
      } else {
        new_post_slug = newSlug.toLowerCase();
      }
    }

    try {
      const newPost: BlogPost = {
        id: new_post_slug,
        title: newTitle,
        author: newAuthor,
        date: new Date().toUTCString(),
        contentHtml: updatedContent,
      };

      await createPost(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  };

  return (
    <>
      <div className={show ? "d-block" : "d-none"}>
        <Notification
          loading
          withCloseButton={false}
          withBorder
          title="Please be patient!"
        >
          Your blog post is being created and you are then after redirected to
          the edit page.
        </Notification>
      </div>
      <Group grow>
        <form
          className="form"
          method="post"
          onSubmit={async (event: any) => {
            event?.preventDefault();
            await createNewPost();
          }}
        >
          <TextInput
            label="Blog post id"
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
            label="Blog post title"
            value={newTitle}
            name="blog_post_title"
            placeholder="Type a new title ..."
            onChange={updateTitle}
            rightSectionPointerEvents="all"
            mt="md"
            required
          />
          <TextInput
            label="Blog post author"
            value={newAuthor}
            name="blog_post_title"
            placeholder="Type the new authors name ..."
            onChange={updateAuther}
            rightSectionPointerEvents="all"
            mt="md"
          />
          <div className="mt-3">
            <InputWrapper>
              <Input.Label>Blog post content</Input.Label>
              <RTE content={""}></RTE>
            </InputWrapper>
          </div>
          <div className="create-post-modal-actions mt-4">
            <Center>
              <Button color="teal" type="submit">
                Create blog post
              </Button>
            </Center>
          </div>
        </form>
      </Group>
    </>
  );
}
