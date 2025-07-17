import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const [filterOption, setFilterOption] = useState("all");

  // Inputs
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Cleanup object URL khi unmount hoặc thay đổi file
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Lấy danh sách bài viết
  const fetchArticles = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };
  const handleFilterChange = async (e) => {
    const value = e.target.value;
    setFilterOption(value);

    if (value === "latest") {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để xem bài viết mới nhất.");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/article/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.code === 200) {
          setArticles(response.data.data);
          setCurrentPage(1);
          setError(null);
        } else {
          setError("Không thể lấy danh sách bài viết mới nhất.");
        }
      } catch (err) {
        setError("Lỗi khi gọi API: " + err.message);
      } finally {
        setLoading(false);
      }
    } else if (value === "all") {
      fetchArticles();
    }
  };

  // Reset lại tất cả bài viết
  const handleShowAll = () => {
    fetchArticles();
  };

  // Gửi bài viết mới
  const handleCommentSubmit = async () => {
    if (!title.trim() || !comment.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để đăng bài viết.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", comment);
    formData.append("category", "blog chia sẻ kinh nghiệm");
    if (attachment) {
      formData.append("image", attachment);
    }

    try {
      // axios tự set Content-Type khi dùng FormData
      const response = await axios.post(
        "http://localhost:8080/api/article/save",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.code === 200) {
        alert("Bài viết đã được đăng thành công!");
        setTitle("");
        setComment("");
        setAttachment(null);
        setPreviewImage(null);
        fetchArticles();
      } else {
        alert("Có lỗi xảy ra khi gửi bài viết.");
      }
    } catch (error) {
      alert("Lỗi kết nối khi gửi bài viết: " + error.message);
    }
  };

  // Phân trang
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
        <div className="filter-dropdown">

          <label htmlFor="filter" style={{ marginRight: "8px" }}>
            Lọc bài viết:
          </label>
          <select
            id="filter"
            value={filterOption}
            onChange={handleFilterChange}
            style={{ padding: "6px 12px", borderRadius: "6px" }}
          >
            <option value="all">Hiển thị tất cả bài viết</option>
            <option value="latest">5 bài viết mới nhất</option>
          </select>
        </div>

        {/* Form đăng bài */}
        <div className="global-comment-box">
          <input
            type="text"
            className="title-input"
            placeholder="Tiêu đề bài viết..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

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
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {attachment && <span className="file-name">{attachment.name}</span>}
            <button className="submit-btn" onClick={handleCommentSubmit}>
              Gửi
            </button>
          </div>

          {/* Ảnh xem trước */}
          {previewImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={previewImage}
                alt="preview"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Thông báo lỗi */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Danh sách bài viết */}
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : currentArticles.length === 0 ? (
          <p>Không có bài viết nào</p>
        ) : (
          currentArticles.map((article, index) => (
            <BlogItem key={index} article={article} />
          ))
        )}

        {/* Phân trang */}
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
