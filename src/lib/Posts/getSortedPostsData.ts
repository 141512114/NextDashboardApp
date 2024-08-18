const getSortedPostsData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/get/all`, {
      method: "GET",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getSortedPostsData;
