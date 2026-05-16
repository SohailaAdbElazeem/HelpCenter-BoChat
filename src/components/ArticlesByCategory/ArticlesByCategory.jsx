import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useSearch } from "../../Context/SearchContext";
import { increaseArticleView } from "../../utils/increaseArticleView";

const ArticlesByCategory = () => {
  const { t, i18n } = useTranslation();
  const { searchTerm } = useSearch();
  const navigate = useNavigate();
  const { ctg } = useParams();

  const isLTR = i18n.language === "en";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = "https://bo-chat.space";

  const categoriesMap = useMemo(() => ({
    1: "privacy",
    2: "quickStart",
    3: "smartFeatures",
    4: "customization",
    5: "accountSettings",
    6: "payments",
    7: "ambassadors",
    8: "invest",
    9: "developers",
  }), []);

  // عنوان التصنيف
  const categoryTitle = useMemo(() => {
    const key = categoriesMap[ctg];
    if (!key) return isLTR ? "Articles" : "مقالات";

    const translation = t(`categories.${key}`);

    if (!translation || translation === `categories.${key}`) {
      const fallbacks = {
        en: {
          privacy: "Privacy & Security",
          quickStart: "Quick Start",
          smartFeatures: "Smart Features",
          customization: "Customization",
          accountSettings: "Account & Settings",
          payments: "Payments & Subscriptions",
          ambassadors: "Ambassador Program",
          invest: "Invest With Us",
          developers: "Developers & Contributors",
        },
        ar: {
          privacy: "الخصوصية والأمان",
          quickStart: "البداية السريعة",
          smartFeatures: "المميزات الذكية",
          customization: "تخصيص التجربة",
          accountSettings: "الحساب والإعدادات",
          payments: "الدفع والاشتراكات",
          ambassadors: "برنامج السفراء",
          invest: "استثمر معنا",
          developers: "المطورون والمساهمون",
        },
      };
      return fallbacks[i18n.language]?.[key] || key;
    }
    return translation;
  }, [ctg, t, i18n.language, categoriesMap]);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${URL}/dashboard/articles/AllByCTG?page=1&limit=20&ctg=${ctg}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      let fetchedArticles = data.response || [];

      // دمج الترجمة الديناميكية
      fetchedArticles = fetchedArticles.map(article => {
        const translationKey = `dynamicArticles.${article._id}`;
        const translated = t(translationKey, { returnObjects: true });

        console.log(`Translating ${article._id} →`, translated); // للتصحيح

        if (translated && typeof translated === "object" && translated.title) {
          return {
            ...article,
            title: translated.title,
            content: translated.content || article.content,
          };
        }
        return article;
      });

      setArticles(fetchedArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, [ctg, t]);

  useEffect(() => {
    if (ctg) fetchArticles();
  }, [ctg, fetchArticles]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm?.trim()) return articles;
    return articles.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, articles]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm?.trim() || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
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
        part
      )
    );
  };

  // Loading State
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}
      >
        <div className="spinner-border text-danger" role="status" />
        <p className="ms-2">{t("loading") || "Loading..."}</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}
      >
        <div className="text-center bg-danger bg-opacity-75 p-4 rounded-4 text-white">
          <h4>حدث خطأ</h4>
          <p>{error}</p>
          <button className="btn btn-light mt-2" onClick={() => window.location.reload()}>
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        direction: isLTR ? "ltr" : "rtl",
      }}
    >
      <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <Search />

        <div className="mb-5 Head-title">
          <div
            className="fw-bold"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(30px, 8vw, 65px)",
              lineHeight: "clamp(35px, 6vw, 55px)",
              color: "#000000",
              margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
              textAlign: isLTR ? "left" : "right",
            }}
          >
            {highlightText(categoryTitle, searchTerm)}
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="w-100 d-flex align-items-center justify-content-center">
            <div
              className="text-center p-5 bg-white bg-opacity-75 rounded-4"
              style={{ maxWidth: "600px", width: "90%" }}
            >
              <p style={{ fontSize: "clamp(18px, 5vw, 24px)", color: "#D72229", fontWeight: "bold" }}>
                {isLTR
                  ? "No articles available in this category yet."
                  : "هذا النوع لا يوجد به مقالات حالياً"}
              </p>
              <p style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>
                {isLTR ? "Please check back later." : "يرجى العودة لاحقاً."}
              </p>
            </div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="row gx-2 gy-3" style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}>
            {filteredArticles.map((article) => (
              <div key={article._id} className="col-12 col-md-6 d-flex">
                <div
                  className="d-flex align-items-center px-4 shadow-sm"
                  style={{
                    width: "100%",
                    height: "60px",
                    background: "#EDEDED",
                    borderRadius: "28px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                    e.currentTarget.style.background = "#e0e0e0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#EDEDED";
                  }}
                  onClick={() => {
                    increaseArticleView(article._id);
                    navigate(`/article/${article._id}`);
                  }}
                >
                  <div
                    className="bg-danger rounded-circle flex-shrink-0"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginLeft: isLTR ? "0" : "auto",
                      marginRight: isLTR ? "10px" : "0",
                    }}
                  />
                  <span
                    className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      textAlign: isLTR ? "left" : "right",
                      fontSize: "clamp(14px, 4vw, 20px)",
                    }}
                  >
                    {highlightText(article.title, searchTerm)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-5 bg-white bg-opacity-75 rounded-4 m-4" style={{ maxWidth: "500px", margin: "40px auto" }}>
            <p style={{ fontSize: "18px", color: "#666" }}>
              {t("security.noResults", { searchTerm }) || "No results found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesByCategory;
