import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/api/article/category?category=blog chia sẻ kinh nghiệm"
      )
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

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <h2>Blog Chia Sẻ Kinh Nghiệm</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentArticles.length === 0 ? (
          <p>Không có bài viết nào</p>
        ) : (
          currentArticles.map((article, index) => (
            <BlogItem key={index} article={article} />
          ))
        )}

        {/* Pagination */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
