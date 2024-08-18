const getPostData = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/get/${slug}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getPostData;
