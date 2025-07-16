import React, { useEffect, useState } from "react";
import axios from "axios";
import extractListFromColonToDot from "../../assets/js/extractListFromColonToDot";
import splitText from "../../assets/js/splitText";
import { useNavigate } from "react-router-dom";

// Chuyển title -> URL thân thiện
const convertTitleToPath = (title) => {
  const map = {
    "O+": "o-positive",
    "O-": "o-negative",
    "A+": "a-positive",
    "A-": "a-negative",
    "B+": "b-positive",
    "B-": "b-negative",
    "AB+": "ab-positive",
    "AB-": "ab-negative",
    Hiếm: "rare",
  };

  const match = title.match(/Nhóm máu ([AOB]{1,2}[+-]?|Hiếm)/i);
  const group = match?.[1] || "unknown";

  return `/blood-type/${map[group] || "unknown"}`;
};

// Component hiển thị card
const BloodCardGrid = ({ card }) => {
  const navigate = useNavigate();

  const handleLearnMore = (card) => {
    const path = convertTitleToPath(card.title);
    navigate(path);
  };

  return (
    <div className="blood-grid">
      {card.map((card, index) => (
        <div className="card" key={index}>
          <div className="card_image">
            <img src={card.imgPath} alt={card.title} />
          </div>
          <div className="card_body">
            <h4>{card.title}</h4>
            <p>{card.content}</p>
            <button className="card-btn" onClick={() => handleLearnMore(card)}>
              Tìm hiểu thêm về {card.title}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TypeOfBlood = () => {
  const [articles, setArticles] = useState([]);
  const [bloodCards, setBloodCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/article/category?category=Tổng quan nhóm máu",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const rawData = res.data?.data || [];
        const titlesToExtract = [
          "Nhóm máu nào là hiếm nhất?",
          "Hệ thống nhóm máu ABO",
        ];

        const updatedArticles = rawData.map((item) =>
          titlesToExtract.includes(item.title)
            ? extractListFromColonToDot(item)
            : item
        );

        setArticles(updatedArticles);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    const fetchBloodCards = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/article/category?category=Card nhóm máu",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBloodCards(res.data?.data || []);
      } catch (err) {
        console.error("Lỗi khi tải Blood Card:", err);
      }
    };

    fetchArticles();
    fetchBloodCards();
  }, []);

  const renderArticle = (item, index) => (
    <div className="article-block" key={index}>
      <h3>{item.title}</h3>

      {item.listItems ? (
        <>
          {splitText(item.intro).map((s, i) => (
            <React.Fragment key={i}>
              - {s}
              <br />
            </React.Fragment>
          ))}

          <ul>
            {item.listItems.map((list, i) => (
              <li key={i}>{list}</li>
            ))}
          </ul>

          {splitText(item.outro).map((s, i) => (
            <React.Fragment key={i}>
              {s}
              <br />
            </React.Fragment>
          ))}
        </>
      ) : (
        splitText(item.content).map((s, i) => (
          <React.Fragment key={i}>
            - {s}
            <br />
          </React.Fragment>
        ))
      )}

      {item.imgPath && item.imgPath.includes("/upload/") && (
        <div className="article-image">
          <img src={item.imgPath} alt={item.title} />
        </div>
      )}
    </div>
  );

  // Phân chia vị trí chèn card
  const beforeCards = [];
  const afterCards = [];
  let foundInsertPoint = false;

  for (let article of articles) {
    if (article.title === "Các nhóm máu nào tương thích?") {
      foundInsertPoint = true;
    }
    if (!foundInsertPoint) {
      beforeCards.push(article);
    } else {
      afterCards.push(article);
    }
  }

  return (
    <section className="blood-section">
      <h2>Nhóm máu</h2>

      {beforeCards.map((item, index) => renderArticle(item, index))}

      {bloodCards.length > 0 && <BloodCardGrid card={bloodCards} />}

      {afterCards.map((item, index) =>
        renderArticle(item, beforeCards.length + index)
      )}
    </section>
  );
};

export default TypeOfBlood;
