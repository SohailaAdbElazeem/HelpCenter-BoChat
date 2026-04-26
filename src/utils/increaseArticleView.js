export const increaseArticleView = async (articleId) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

//   console.log("userId");
  
   if (!userId || !token || !articleId) return;

  const viewedKey = `viewed_${articleId}`;

  if (sessionStorage.getItem(viewedKey)) return;

  try {
    const res = await fetch(
      "https://bo-chat.space/dashboard/articles/View",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleid: articleId,
          userid: userId,
        }),
      }
    );

    const data = await res.json();
    console.log("VIEW RESPONSE:", data);

    if (data?.success) {
      sessionStorage.setItem(viewedKey, "true");
    }
  } catch (err) {
    console.error("View error:", err);
  }
};