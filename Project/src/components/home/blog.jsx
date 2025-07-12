import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  // Comment input
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState(null);

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

  const handleCommentSubmit = () => {
    console.log("Bình luận:", comment);
    console.log("File:", attachment);
    alert("Bình luận đã được gửi (giả lập)");
    setComment("");
    setAttachment(null);
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

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

        {/* Comment Box at top */}
        <div className="global-comment-box">
          <textarea
            className="comment-input"
            placeholder="Chia sẻ cảm nghĩ của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="comment-actions">
            <label className="attach-btn">
              📎 Đính kèm
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {attachment && <span className="file-name">{attachment.name}</span>}
            <button className="submit-btn" onClick={handleCommentSubmit}>
              Gửi
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Blog list */}
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : currentArticles.length === 0 ? (
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
