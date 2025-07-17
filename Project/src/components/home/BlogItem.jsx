import React, { useState } from "react";

const BlogItem = ({ article }) => {
  const [showImage, setShowImage] = useState(false);

  const hasImage = article.imgPath?.includes("/upload/");
  const baseURL = "http://localhost:8080";
  const imgSrc =
    article.imgPath && !article.imgPath.startsWith("http")
      ? baseURL + article.imgPath
      : article.imgPath;

  const toggleImage = () => setShowImage((prev) => !prev);

  return (
    <article className="comment-box">
      <div className="comment-content">
        <p className="comment-title">{article.title}</p>
        <p className="comment-text">{article.content}</p>

        {hasImage && (
          <>
            {showImage && (
              <img src={imgSrc} alt={article.title} className="comment-image" />
            )}
            <button className="toggle-image-btn" onClick={toggleImage}>
              {showImage ? "Thu gọn" : "Xem thêm"}
            </button>
          </>
        )}
      </div>

      <div className="comment-footer">
        <span className="author">
          Người viết: {article.author || "Ẩn danh"}
        </span>
        <span className="date">
          Ngày đăng: {new Date(article.publishDate).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
};

export default BlogItem;
