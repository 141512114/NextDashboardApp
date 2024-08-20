"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createPost = async (post: BlogPost) => {
  let postResponse: BlogPost;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/create`, {
      method: "POST",
      body: JSON.stringify(post),
    });
    const data = await res.json();
    postResponse = data.data;
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidatePath("/posts");
  redirect(`/posts/${postResponse.id}/edit`);
};

export default createPost;
