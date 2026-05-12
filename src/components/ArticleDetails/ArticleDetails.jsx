import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../Search/Search";
import { useSearch } from "../../Context/SearchContext";
import { increaseArticleView } from "../../utils/increaseArticleView";
import { markArticleUseful } from "../../utils/markArticleUseful";

export default function ArticleDetails() {
  const { t, i18n } = useTranslation();
  const { searchTerm } = useSearch();
  const isLTR = i18n.language === "en";
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [usefulCount, setUsefulCount] = useState(0);
  const [unusefulCount, setUnusefulCount] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);

  const URL = "https://bo-chat.space";

  const getToken = () => localStorage.getItem("token");

  // Helper: Extract userId from token if not in localStorage
  // const getUserId = () => {
  //   let userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     const token = getToken();
  //     if (token) {
  //       try {
  //         const payload = JSON.parse(atob(token.split('.')[1]));
  //         userId = payload.userid || payload.userId || payload.id || payload.sub;
  //         if (userId) localStorage.setItem("userId", userId);
  //       } catch (e) {
  //         console.warn("Cannot decode token", e);
  //       }
  //     }
  //   }
  //   return userId;
  // };
  const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.userid || payload.userId || payload.id || payload.sub;
        if (userId) localStorage.setItem("userId", userId);
      } catch {}
    }
  }
  return userId;
};

  // Ensure userId exists before voting
  useEffect(() => {
    getUserId(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategoryName = (ctg) => {
    const categories = {
      1: "الخصوصية والأمان",
      2: "البداية السريعة",
      3: "المميزات الذكية",
      4: "تخصيص التجربة",
      5: "الحساب والإعدادات",
      6: "الدفع والاشتراكات",
      7: "برنامج السفراء",
    };
    return categories[ctg] || "غير معروف";
  };

  // 1. Fetch main article
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        // const token = getToken();
        const res = await fetch(
          `${URL}/dashboard/articles/Article?articleid=${id}`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          if (res.status === 404) throw new Error("Article not found");
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        if (data.success && Array.isArray(data.response) && data.response.length > 0) {
          const fetchedArticle = data.response[0];
          setArticle(fetchedArticle);
          setUsefulCount(fetchedArticle.usefulCount || 0);
          setUnusefulCount(fetchedArticle.unusefulCount || 0);
          // If API returns user's vote (optional)
          setUserVote(fetchedArticle.userVote || null);
        } else {
          throw new Error("Article not found in response");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load article");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // 2. Increment view count
  useEffect(() => {
    if (!id) return;
    increaseArticleView(id);
  }, [id]);

  // 3. Fetch related articles
  useEffect(() => {
    const fetchRelated = async () => {
      if (!article?.ctg && article?.ctg !== 0) return;

      try {
        // const token = getToken();
        const res = await fetch(
          `${URL}/dashboard/articles/AllByCTG?page=1&limit=20&ctg=${article.ctg}`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          console.warn("Related articles fetch failed:", res.status);
          setRelatedArticles([]);
          return;
        }

        const data = await res.json();
        let related = data.response || [];
        related = related.filter((item) => item._id !== article._id).slice(0, 6);
        setRelatedArticles(related);
      } catch (err) {
        console.error("Error fetching related articles:", err);
        setRelatedArticles([]);
      }
    };

    fetchRelated();
  }, [article?.ctg, article?._id]);

  
  // Handle vote with better error handling
  const handleVote = async (newVoteValue) => {
    if (voteLoading) return;
    if (userVote === newVoteValue) {
      console.log("Already voted this way");
      return;
    }

    // Check if user is authenticated
    const userId = localStorage.getItem("userId");
    const token = getToken();
    if (!userId || !token) {
      alert("برجاء تسجيل الدخول أولاً لتقييم المقال");
      return;
    }

    const oldVote = userVote;
    // Optimistic update
    let newUseful = usefulCount;
    let newUnuseful = unusefulCount;

    if (oldVote === 1) newUseful--;
    else if (oldVote === 0) newUnuseful--;

    if (newVoteValue === 1) newUseful++;
    else if (newVoteValue === 0) newUnuseful++;

    setUsefulCount(newUseful);
    setUnusefulCount(newUnuseful);
    setUserVote(newVoteValue);
    setVoteLoading(true);

    try {
      const response = await markArticleUseful(id, newVoteValue);
      console.log("Vote API response:", response);

      // Check if response is valid and successful
      if (response && response.success === true) {
        console.log("Vote registered successfully");
      } else {
        // If response is undefined or success false, treat as failure
        throw new Error(response?.message || "فشل تسجيل التقييم");
      }
    } catch (err) {
      console.error("Vote error:", err);
      // Rollback
      setUsefulCount(usefulCount);
      setUnusefulCount(unusefulCount);
      setUserVote(oldVote);
      alert(err.message || "حدث خطأ أثناء تسجيل التقييم، حاول مرة أخرى");
    } finally {
      setVoteLoading(false);
    }
  };

  const handleUseful = () => handleVote(1);
  const handleUnuseful = () => handleVote(0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const locale = i18n.language === "en" ? "en-US" : "ar-EG";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Highlight search term
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    try {
      const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      const parts = text.split(regex);
      return parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            style={{
              backgroundColor: "rgba(215, 34, 41, 0.2)",
              fontWeight: "bold",
              padding: "0 2px",
              borderRadius: "4px",
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    } catch {
      return text;
    }
  };
  const total = usefulCount + unusefulCount;
 if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        }}
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ms-2">{t("loading") || "Loading..."}</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          {error || "Article not found"}
        </div>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background:
          "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        direction: isLTR ? "ltr" : "rtl",
      }}
    >
      <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <Search />

        <div className="mb-5">
          <div
            className="fw-bold"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              color: "#000",
              fontSize: "clamp(30px, 8vw, 65px)",
              lineHeight: "clamp(25px, 5vw, 45px)",
              margin: "40px 0",
              textAlign: isLTR ? "left" : "right",
            }}
          >
            {highlightText(article.title, searchTerm)}
          </div>
        </div>

        <div
          className={`d-flex flex-wrap align-items-center ${
            !isLTR ? "flex-row-reverse" : ""
          }`}
          style={{
            color: "#ffffff",
            justifyContent: isLTR ? "flex-start" : "flex-end",
            gap: "20px",
            marginBottom: "10px",
          }}
        >
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <span>{t("newAccount.updated")}</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <span>
              {t("newAccount.lastUpdated")}:{" "}
              {formatDate(article.lastUpdate || article.createdAt)}
            </span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <span>👁️</span>
            <span>{article.viewsCount || 0} views</span>
          </div>
        </div>

        <div
          className={`d-flex flex-wrap align-items-center ${
            !isLTR ? "flex-row-reverse" : ""
          }`}
          style={{
            color: "#ffffff",
            justifyContent: isLTR ? "flex-start" : "flex-end",
            gap: "8px",
            marginBottom: "30px",
          }}
        >
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <span>{getCategoryName(article.ctg)}</span>
          </div>
        </div>

        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            lineHeight: "1.9",
            fontSize: "18px",
            textAlign: isLTR ? "left" : "right",
            whiteSpace: "pre-line",
          }}
        >
          {highlightText(article.content, searchTerm)}
        </div>

        {/* Feedback Section */}
        <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5 px-3">
          <h5
            style={{
              fontSize: "clamp(18px, 5vw, 24px)",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 600,
              color: "#000000",
              textAlign: "center",
              marginBottom: "clamp(15px, 4vw, 25px)",
            }}
          >
            {highlightText(t("newAccount.foundAnswer"), searchTerm)}
          </h5>
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
            <button
              className="mx-2"
              style={{
                width: "clamp(120px, 30vw, 150px)",
                height: "clamp(45px, 8vh, 50px)",
                borderRadius: "clamp(14px, 4vw, 18px)",
                border: "none",
                background: userVote === 1 ? "#D72229" : "#FFFFFF",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(14px, 3.5vw, 16px)",
                fontWeight: 600,
                color: userVote === 1 ? "#FFFFFF" : "#D72229",
                cursor: voteLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                opacity: voteLoading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!voteLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
              onClick={handleUseful}
              disabled={voteLoading}
            >
              {t("newAccount.yes")}
            </button>
            <button
              style={{
                width: "clamp(120px, 30vw, 150px)",
                height: "clamp(45px, 8vh, 50px)",
                borderRadius: "clamp(14px, 4vw, 18px)",
                border: "none",
                background: userVote === 0 ? "#D72229" : "#FFFFFF",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(14px, 3.5vw, 16px)",
                fontWeight: 600,
                color: userVote === 0 ? "#FFFFFF" : "#D72229",
                cursor: voteLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                opacity: voteLoading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!voteLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
              onClick={handleUnuseful}
              disabled={voteLoading}
            >
              {t("newAccount.notHelpful")}
            </button>
          </div>
          <p
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(12px, 3.5vw, 14px)",
              color: "#000000",
              textAlign: "center",
              marginTop: "clamp(10px, 3vw, 15px)",
              marginBottom: "clamp(15px, 4vw, 20px)",
            }}
          >
            {/* 👍 {usefulCount} &nbsp;&nbsp;|&nbsp;&nbsp; 👎 {unusefulCount} */}
             {total === 0
    ? (i18n.language === "ar" ? "لا توجد تقييمات بعد" : "No ratings yet")
    : (i18n.language === "ar"
        ? `${usefulCount} من ${total} وجدوا هذا مفيداً`
        : `${usefulCount} of ${total} found this helpful`)}
          </p>
          <span
            style={{
              width: "min(1020px, 90%)",
              maxWidth: "1020px",
              height: "1px",
              background: "#000000",
              margin: "0 auto",
            }}
          ></span>
        </div>

        {/* Related Articles */}
        <h4
          style={{
            textAlign: isLTR ? "left" : "right",
            marginBottom: "20px",
          }}
        >
          {t("newAccount.articles")}
        </h4>
        <div className="row gx-2 gy-3">
          {relatedArticles.map((item) => (
            <div key={item._id} className="col-12 col-md-6 d-flex">
              <div
                className="d-flex align-items-center px-4 shadow-sm"
                style={{
                  width: "100%",
                  height: "60px",
                  background: "#EDEDED",
                  borderRadius: "28px",
                  cursor: "pointer",
                  // flexDirection: isLTR ? "row" : "row-reverse",
                }}
                onClick={() => navigate(`/article/${item._id}`)}
              >
                <div
                  className="bg-danger rounded-circle"
                  style={{ width: 12, height: 12, margin: "0 10px" }}
                />
                <span
                  style={{
                    fontFamily: "Cairo",
                    fontSize: 18,
                    color: "#000",
                    flexGrow: 1,
                    textAlign: isLTR ? "left" : "right",
                  }}
                >
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        {relatedArticles.length === 0 && !loading && (
          <p className="text-center mt-3">لا توجد مقالات ذات صلة</p>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate, useParams } from "react-router-dom";
// import Search from "../Search/Search";
// import { useSearch } from "../../Context/SearchContext";
// import { increaseArticleView } from "../../utils/increaseArticleView";
// import { markArticleUseful } from "../../utils/markArticleUseful";

// export default function ArticleDetails() {
//   const { t, i18n } = useTranslation();
//   const { searchTerm } = useSearch();
//   const isLTR = i18n.language === "en";
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [relatedArticles, setRelatedArticles] = useState([]);

//   const [usefulCount, setUsefulCount] = useState(0);
//   const [unusefulCount, setUnusefulCount] = useState(0);
//   const [userVote, setUserVote] = useState(null);
//   const [voteLoading, setVoteLoading] = useState(false);

//   const URL = "https://bo-chat.space";

//   const getToken = () => localStorage.getItem("token");

//   const getUserId = () => {
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const payload = JSON.parse(atob(token.split(".")[1]));
//           userId = payload.userid || payload.userId || payload.id || payload.sub;
//           if (userId) localStorage.setItem("userId", userId);
//         } catch {}
//       }
//     }
//     return userId;
//   };

//   useEffect(() => {
//     getUserId();
//   }, []);

//    const getCategoryName = (ctg) => {
//     const categoryKeys = {
//       1: "security.title",
//       2: "quickstart.title",
//       3: "smartFeatures.title",
//       4: "personalizeExp.title",
//       5: "accountSettings.title",
//       6: "subscriptions.title",
//       7: "Ambassadors.title",
//       8: "Invest.title",
//       9: "Developers.title",
//     };
//     const key = categoryKeys[ctg];
//     return key ? t(key) : "غير معروف";
//   };

//   // ============================================================
//   // FETCH LOGIC – static from i18n, then API
//   // ============================================================
//   useEffect(() => {
//     const loadArticle = async () => {
//       if (!id) {
//         setError(t("articleNotFound") || "No article ID provided");
//         setLoading(false);
//         return;
//       }

//       // 1. STATIC ARTICLE (ID starts with "static_")
//       if (typeof id === "string" && id.startsWith("static_")) {
//         const staticArticle = t(`staticArticles.${id}`, { returnObjects: true });
//         if (staticArticle && staticArticle.title) {
//           setArticle(staticArticle);
//           setUsefulCount(staticArticle.usefulCount || 0);
//           setUnusefulCount(staticArticle.unusefulCount || 0);
//           setUserVote(null);
//           setLoading(false);
//           return;
//         } else {
//           setError(t("articleNotFound") || "المقال غير موجود");
//           setLoading(false);
//           return;
//         }
//       }

//       // 2. REAL API ARTICLE
//       try {
//         setLoading(true);
//         setError("");
//         const token = getToken();
//         const res = await fetch(
//           `${URL}/dashboard/articles/Article?articleid=${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!res.ok) {
//           if (res.status === 404) throw new Error("Article not found");
//           throw new Error(`Server error: ${res.status}`);
//         }

//         const data = await res.json();
//         if (data.success && Array.isArray(data.response) && data.response.length > 0) {
//           const fetchedArticle = data.response[0];
//           setArticle(fetchedArticle);
//           setUsefulCount(fetchedArticle.usefulCount || 0);
//           setUnusefulCount(fetchedArticle.unusefulCount || 0);
//           setUserVote(fetchedArticle.userVote || null);
//         } else {
//           throw new Error("Article not found in response");
//         }
//       } catch (err) {
//         console.error(err);
//         setError(err.message || t("failedToLoad") || "Failed to load article");
//         setArticle(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadArticle();
//   }, [id, t]);

//   // Increment view count (skip static)
//   useEffect(() => {
//     if (!id) return;
//     if (id.startsWith("static_")) return;
//     increaseArticleView(id);
//   }, [id]);

//   // Fetch related articles (supports both static and API)
//   useEffect(() => {
//     const fetchRelated = async () => {
//       if (!article?.ctg && article?.ctg !== 0) return;

//       // Static article: filter from translation staticArticles
//       if (id && id.startsWith("static_")) {
//         const allStatic = t("staticArticles", { returnObjects: true }) || {};
//         const allStaticArray = Object.keys(allStatic).map((key) => ({
//           ...allStatic[key],
//           _id: key,
//         }));
//         const related = allStaticArray.filter(
//           (item) => item.ctg === article.ctg && item._id !== id
//         );
//         setRelatedArticles(related.slice(0, 6));
//         return;
//       }

//       // API article
//       try {
//         const token = getToken();
//         const res = await fetch(
//           `${URL}/dashboard/articles/AllByCTG?page=1&limit=20&ctg=${article.ctg}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!res.ok) {
//           console.warn("Related articles fetch failed:", res.status);
//           setRelatedArticles([]);
//           return;
//         }

//         const data = await res.json();
//         let related = data.response || [];
//         related = related.filter((item) => item._id !== article._id).slice(0, 6);
//         setRelatedArticles(related);
//       } catch (err) {
//         console.error("Error fetching related articles:", err);
//         setRelatedArticles([]);
//       }
//     };

//     fetchRelated();
//   }, [article?.ctg, article?._id, id, t]);

//   // Handle vote (static: local only, API: real)
//   const handleVote = async (newVoteValue) => {
//     if (voteLoading) return;
//     if (userVote === newVoteValue) return;

//     const isStatic = id?.startsWith("static_");

//     if (!isStatic) {
//       const userId = localStorage.getItem("userId");
//       const token = getToken();
//       if (!userId || !token) {
//         alert(t("loginToVote") || "برجاء تسجيل الدخول أولاً لتقييم المقال");
//         return;
//       }
//     }

//     // Optimistic update
//     const oldVote = userVote;
//     let newUseful = usefulCount;
//     let newUnuseful = unusefulCount;

//     if (oldVote === 1) newUseful--;
//     else if (oldVote === 0) newUnuseful--;

//     if (newVoteValue === 1) newUseful++;
//     else if (newVoteValue === 0) newUnuseful++;

//     setUsefulCount(newUseful);
//     setUnusefulCount(newUnuseful);
//     setUserVote(newVoteValue);
//     setVoteLoading(true);

//     if (isStatic) {
//       setTimeout(() => setVoteLoading(false), 300);
//       return;
//     }

//     try {
//       const response = await markArticleUseful(id, newVoteValue);
//       if (response && response.success === true) {
//         console.log("Vote registered successfully");
//       } else {
//         throw new Error(response?.message || t("voteFailed") || "فشل تسجيل التقييم");
//       }
//     } catch (err) {
//       console.error("Vote error:", err);
//       setUsefulCount(usefulCount);
//       setUnusefulCount(unusefulCount);
//       setUserVote(oldVote);
//       alert(err.message || t("voteError") || "حدث خطأ أثناء تسجيل التقييم، حاول مرة أخرى");
//     } finally {
//       setVoteLoading(false);
//     }
//   };

//   const handleUseful = () => handleVote(1);
//   const handleUnuseful = () => handleVote(0);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const locale = i18n.language === "en" ? "en-US" : "ar-EG";
//     return date.toLocaleDateString(locale, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const highlightText = (text, searchTerm) => {
//     if (!searchTerm || !text) return text;
//     try {
//       const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//       const regex = new RegExp(`(${escaped})`, "gi");
//       const parts = text.split(regex);
//       return parts.map((part, index) =>
//         regex.test(part) ? (
//           <mark
//             key={index}
//             style={{
//               backgroundColor: "rgba(215, 34, 41, 0.2)",
//               fontWeight: "bold",
//               padding: "0 2px",
//               borderRadius: "4px",
//             }}
//           >
//             {part}
//           </mark>
//         ) : (
//           <span key={index}>{part}</span>
//         )
//       );
//     } catch {
//       return text;
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="min-vh-100 d-flex align-items-center justify-content-center"
//         style={{
//           background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
//         }}
//       >
//         <div className="spinner-border text-danger" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="ms-2">{t("loading") || "Loading..."}</p>
//       </div>
//     );
//   }

//   if (error || !article) {
//     return (
//       <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
//         <div className="alert alert-danger" role="alert">
//           {error || t("articleNotFound") || "Article not found"}
//         </div>
//         <button className="btn btn-primary" onClick={() => window.location.reload()}>
//           {t("retry") || "Retry"}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-vh-100 d-flex align-items-center justify-content-center p-4"
//       style={{
//         background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
//         direction: isLTR ? "ltr" : "rtl",
//       }}
//     >
//       <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
//         <Search />

//         <div className="mb-5">
//           <div
//             className="fw-bold"
//             style={{
//               fontFamily: "'Cairo', sans-serif",
//               fontWeight: 700,
//               color: "#000",
//               fontSize: "clamp(30px, 8vw, 50px)",
//               lineHeight: "clamp(40px, 5vw, 50px)",
//               margin: "40px 0",
//               textAlign: isLTR ? "left" : "right",
//             }}
//           >
//             {highlightText(article.title, searchTerm)}
//           </div>
//         </div>

//         <div
//           className={`d-flex flex-wrap align-items-center ${!isLTR ? "flex-row-reverse" : ""}`}
//           style={{
//             color: "#ffffff",
//             justifyContent: isLTR ? "flex-start" : "flex-end",
//             gap: "20px",
//             marginBottom: "10px",
//           }}
//         >
//           <div className="d-flex align-items-center" style={{ gap: "8px" }}>
//             <span>{t("newAccount.updated")}</span>
//           </div>
//           <div className="d-flex align-items-center" style={{ gap: "8px" }}>
//             <span>
//               {t("newAccount.lastUpdated")}:{" "}
//               {formatDate(article.lastUpdate || article.createdAt)}
//             </span>
//           </div>
//         </div>

//         <div
//           className={`d-flex flex-wrap align-items-center ${!isLTR ? "flex-row-reverse" : ""}`}
//           style={{
//             color: "#ffffff",
//             justifyContent: isLTR ? "flex-start" : "flex-end",
//             gap: "8px",
//             marginBottom: "30px",
//           }}
//         >
//           <div className="d-flex align-items-center" style={{ gap: "8px" }}>
//             <span>{getCategoryName(article.ctg)}</span>
//           </div>
//         </div>

//         <div
//           style={{
//             padding: "30px",
//             borderRadius: "20px",
//             lineHeight: "1.9",
//             fontSize: "18px",
//             textAlign: isLTR ? "left" : "right",
//             whiteSpace: "pre-line",
//           }}
//         >
//           {highlightText(article.content, searchTerm)}
//         </div>

//         {/* Feedback Section */}
//         <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5 px-3">
//           <h5
//             style={{
//               fontSize: "clamp(18px, 5vw, 24px)",
//               fontFamily: "'Cairo', sans-serif",
//               fontWeight: 600,
//               color: "#000000",
//               textAlign: "center",
//               marginBottom: "clamp(15px, 4vw, 25px)",
//             }}
//           >
//             {highlightText(t("newAccount.foundAnswer"), searchTerm)}
//           </h5>
//           <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
//             <button
//               className="mx-2"
//               style={{
//                 width: "clamp(120px, 30vw, 150px)",
//                 height: "clamp(45px, 8vh, 50px)",
//                 borderRadius: "clamp(14px, 4vw, 18px)",
//                 border: "none",
//                 background: userVote === 1 ? "#D72229" : "#FFFFFF",
//                 fontFamily: "'Cairo', sans-serif",
//                 fontSize: "clamp(14px, 3.5vw, 16px)",
//                 fontWeight: 600,
//                 color: userVote === 1 ? "#FFFFFF" : "#D72229",
//                 cursor: voteLoading ? "not-allowed" : "pointer",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                 opacity: voteLoading ? 0.6 : 1,
//               }}
//               onMouseEnter={(e) => {
//                 if (!voteLoading) {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
//               }}
//               onClick={handleUseful}
//               disabled={voteLoading}
//             >
//               {t("newAccount.yes")}
//             </button>
//             <button
//               style={{
//                 width: "clamp(120px, 30vw, 150px)",
//                 height: "clamp(45px, 8vh, 50px)",
//                 borderRadius: "clamp(14px, 4vw, 18px)",
//                 border: "none",
//                 background: userVote === 0 ? "#D72229" : "#FFFFFF",
//                 fontFamily: "'Cairo', sans-serif",
//                 fontSize: "clamp(14px, 3.5vw, 16px)",
//                 fontWeight: 600,
//                 color: userVote === 0 ? "#FFFFFF" : "#D72229",
//                 cursor: voteLoading ? "not-allowed" : "pointer",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                 opacity: voteLoading ? 0.6 : 1,
//               }}
//               onMouseEnter={(e) => {
//                 if (!voteLoading) {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
//               }}
//               onClick={handleUnuseful}
//               disabled={voteLoading}
//             >
//               {t("newAccount.notHelpful")}
//             </button>
//           </div>

//           <p
//             style={{
//               fontFamily: "'Cairo', sans-serif",
//               fontSize: "clamp(12px, 3.5vw, 14px)",
//               color: "#000000",
//               textAlign: "center",
//               marginTop: "clamp(10px, 3vw, 15px)",
//               marginBottom: "clamp(15px, 4vw, 20px)",
//             }}
//           >
//             {usefulCount + unusefulCount > 0 ? (
//               isLTR ? (
//                 `${usefulCount} out of ${usefulCount + unusefulCount} found this helpful`
//               ) : (
//                 `${usefulCount} من ${usefulCount + unusefulCount} وجدوا هذا مفيداً`
//               )
//             ) : (
//               isLTR ? "No ratings yet" : "لا توجد تقييمات بعد"
//             )}
//           </p>
//           <span
//             style={{
//               width: "min(1020px, 90%)",
//               maxWidth: "1020px",
//               height: "1px",
//               background: "#000000",
//               margin: "0 auto",
//             }}
//           />
//         </div>

//         {/* Related Articles */}
//         <h4 style={{ textAlign: isLTR ? "left" : "right", marginBottom: "20px" }}>
//           {t("newAccount.articles")}
//         </h4>
//         <div className="row gx-2 gy-3">
//           {relatedArticles.map((item) => (
//             <div key={item._id} className="col-12 col-md-6 d-flex">
//               <div
//                 className="d-flex align-items-center px-4 shadow-sm"
//                 style={{
//                   width: "100%",
//                   height: "60px",
//                   background: "#EDEDED",
//                   borderRadius: "28px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => navigate(`/article/${item._id}`)}
//               >
//                 <div
//                   className="bg-danger rounded-circle"
//                   style={{ width: 12, height: 12, margin: "0 10px" }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "Cairo",
//                     fontSize: 18,
//                     color: "#000",
//                     flexGrow: 1,
//                     textAlign: isLTR ? "left" : "right",
//                   }}
//                 >
//                   {item.title}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         {relatedArticles.length === 0 && !loading && (
//           <p className="text-center mt-3">{t("newAccount.noRelatedArticles") || "No related articles found."}</p>
//         )}
//       </div>
//     </div>
//   );
// }