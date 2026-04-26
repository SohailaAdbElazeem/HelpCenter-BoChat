export const markArticleUseful = async (articleId, isUsefull) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

   if (!userId || !token || !articleId) {
    console.warn("Missing data in markArticleUseful:", { userId: !!userId, token: !!token, articleId: !!articleId });
    return { success: false, message: "بيانات المصادقة غير مكتملة" };
  }
  const usefulValue = isUsefull === 1 || isUsefull === "1" ? 1 : 0;
  console.log("Sending vote with userid:", userId, "articleid:", articleId, "value:", usefulValue);

  try {
    const res = await fetch(
      "https://bo-chat.space/dashboard/articles/Usefull",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleid: articleId,
          userid: userId,
          isUsefull: usefulValue,
        }),
      }
    );

     if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      return { success: false, message: `خطأ في الخادم: ${res.status}` };
    }

     let data;
    try {
      data = await res.json();
     } catch (jsonErr) {
      console.error("Invalid JSON response:", jsonErr);
      return { success: false, message: "استجابة غير صالحة من الخادم" };
    }

    console.log("USEFUL RESPONSE:", data);
     return data;
  } catch (err) {
    console.error("Network or fetch error:", err);
    return { success: false, message: err.message || "فشل الاتصال بالخادم" };
  }
};