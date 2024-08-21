"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import axios from "axios";

const deletePost = async (slug: string) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_URL}/api/post/delete/${slug}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidatePath("/posts");
  redirect("/dashboard");
};

export default deletePost;
