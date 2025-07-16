import React, { useEffect, useState } from "react";
import axios from "axios";
import splitText from "../../assets/js/splitText";

const RareBlood = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/article/category?category=nhóm máu hiếm",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const rawData = res.data?.data || [];

        const normalizedData = rawData.map((item) => ({
          ...item,
          imgPath: item.img_path || item.imgPath || "",
        }));

        setArticles(normalizedData);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="blood-section">
      <h2>Nhóm máu hiếm</h2>
      {articles.length > 0 ? (
        articles.map((item, index) => (
          <div className="article-block" key={index}>
            <h3>{item.title}</h3>

            {splitText(item.content).map((s, i) => (
              <React.Fragment key={i}>
                - {s}
                <br />
              </React.Fragment>
            ))}

            {item.imgPath && item.imgPath.includes("/upload/") && (
              <div className="blooddetail-image">
                <img src={item.imgPath} alt={item.title} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Đang tải nội dung...</p>
      )}
    </section>
  );
};

export default RareBlood;
