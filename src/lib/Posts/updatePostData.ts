"use server";

import axios from "axios";

const updatePostData = async (slug: string, update: BlogPost) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_URL}/api/post/update/${slug}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: update,
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default updatePostData;
