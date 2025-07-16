const BlogItem = ({ article }) => {
  const hasImage = article.imgPath?.includes("/upload/");

  // Nếu imgPath chưa có domain, nối thêm
  const baseURL = "http://localhost:8080";
  const imgSrc =
    article.imgPath && !article.imgPath.startsWith("http")
      ? baseURL + article.imgPath
      : article.imgPath;

  return (
    <article className="comment-box">
      <div className="comment-content">
        <p className="comment-title">{article.title}</p>
        <p className="comment-text">{article.content}</p>

        {hasImage && (
          <div className="blooddetail-image">
            <img src={imgSrc} alt={article.title} />
          </div>
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
