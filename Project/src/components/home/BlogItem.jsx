import React, { useState } from "react";

const BlogItem = ({ article }) => {
  const [showImage, setShowImage] = useState(false);

  const hasImage = article.imgPath?.includes("/upload/");

  return (
    <article className="comment-box">
      <div className="comment-content">
        <p className="comment-title">{article.title}</p>
        <p className="comment-text">{article.content}</p>

        {hasImage && !showImage && (
          <p className="see-more" onClick={() => setShowImage(true)}>
            Xem thêm
          </p>
        )}

        {hasImage && showImage && (
          <img
            src={article.imgPath}
            alt={article.title}
            className="comment-image"
          />
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
