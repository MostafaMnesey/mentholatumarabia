import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function ArticleContent({ content }) {
  const cleanHtml = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="article-content">
      {parse(cleanHtml)}
    </div>
  );
}