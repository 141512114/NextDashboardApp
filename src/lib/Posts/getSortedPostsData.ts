"use server";

import axios from "axios";

const getSortedPostsData = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/post/get/all`
    );
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getSortedPostsData;
