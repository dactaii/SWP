import React, { useEffect, useState } from "react";
import axios from "axios";
import extractListFromColonToDot from "../../assets/js/extractListFromColonToDot";
import splitText from "../../assets/js/splitText";

const oPosiType = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/article/category?category=nhóm máu oposi",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const rawData = res.data?.data || [];

        //extractList
        const titlesToExtract = [
          "Người có nhóm máu O+ có thể nhận máu từ những nhóm nào?",
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
    fetchArticles();
  }, []);
  return (
    <section className="blood-section">
      <h2>Nhóm máu O+</h2>
      {articles.length > 0 ? (
        articles.map((item, index) => (
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
          </div>
        ))
      ) : (
        <p>Đang tải nội dung...</p>
      )}
    </section>
  );
};
export default oPosiType;
