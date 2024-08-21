"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import axios from "axios";

const createPost = async (post: BlogPost) => {
  let postResponse: BlogPost;

  try {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_URL}/api/post/create`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: post,
    });
    postResponse = data.data;
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidatePath("/posts");
  redirect(`/posts/${postResponse.id}/edit`);
};

export default createPost;
