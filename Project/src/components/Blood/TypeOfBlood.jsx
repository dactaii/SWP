import React, { useEffect, useState } from "react";
import axios from "axios";
import extractBloodPercentage from "../../assets/js/Percentage";


const TypeOfBlood = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/article/category?category=tài liệu về các loại máu",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const rawData = res.data?.data || [];

        const updatedArticles = rawData.map((item) => // tìm và tách phần hiển thị phần trăm nhóm máu
          item.title === "Nhóm máu nào là hiếm nhất?"
            ? extractBloodPercentage(item)
            : item
        );

        setArticles(updatedArticles);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="blood-section">
      <h2>Nhóm máu</h2>
      {articles.length > 0 ? (
        articles.map((item, index) => (
          <div className="article-block" key={index}>
            <h3>{item.title}</h3>
            {item.bloodTypes ? (
              <>
                <p>{item.intro}</p>
                <ul>
                  {item.bloodTypes.map((blood, i) => (
                    <li key={i}>
                      <strong>{blood.type}</strong>: {blood.percentage}%
                    </li>
                  ))}
                </ul>
                <p>{item.outro}</p>
              </>
            ) : (
              <p>{item.content}</p>
            )}
          </div>
        ))
      ) : (
        <p>Đang tải nội dung...</p>
      )}
    </section>
  );
};

export default TypeOfBlood;
