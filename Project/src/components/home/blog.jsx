import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/article/latest")
      .then((response) => {
        if (response.status === 200 && response.data.code === 200) {
          setArticles(response.data.data);
          setError(null);
        } else {
          setError("Lỗi trả về code khác 200");
        }
      })
      .catch((error) => {
        setError("Lỗi kết nối đến máy chủ: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <h2>Blog Chia Sẻ Kinh Nghiệm</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {articles.length === 0 ? (
          <p>Không có bài viết nào</p>
        ) : (
          articles.map((article, index) => (
            <article key={index} style={{ marginBottom: 20 }}>
              <h3>{article.title}</h3>
              <p>
                <strong>Người viết:</strong> {article.author || "Ẩn danh"} |{" "}
                <strong>Ngày đăng:</strong>{" "}
                {new Date(article.publishDate).toLocaleDateString()}
              </p>
              <div>{article.content}</div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Blog;
