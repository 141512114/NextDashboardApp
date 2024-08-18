const updatePostData = async (slug: string, update: BlogPost) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/update/${slug}`,
      {
        method: "POST",
        body: JSON.stringify(update),
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default updatePostData;
