"use server";

import axios from "axios";

const getPostData = async (slug: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/post/get/${slug}`
    );
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getPostData;
