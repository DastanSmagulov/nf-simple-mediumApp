import Image from "next/image";
import Link from "next/link";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  views: number;
}

interface ArticlesPostProps {
  article: Article;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ArticlesPost = ({ article, onDelete, onEdit }: ArticlesPostProps) => {
  const handleDelete = () => {
    onDelete(article.id);
  };

  const handleEdit = () => {
    onEdit(article.id);
  };

  return (
    <div
      className="flex mb-20 p-6 bg-white rounded-lg shadow-md z-[99]"
      key={article.id}
    >
      <div>
        <div className="flex items-center mb-4">
          <h3 className="font-bold text-black">User ID: {article.userId}</h3>
          <span className="ml-1 text-gray-500">Views: {article.views}</span>
        </div>
        <div className="mb-16 text-black">
          <p className="text-xl font-bold" id="title">
            {article.title}
          </p>
          <p className="mt-6 mb-16 text-base" id="summary">
            {article.body.slice(0, 200)}...
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <button className="bg-gray-100 text-blue-900 py-1 px-4 rounded-full font-medium text-sm">
              {article.tags[0] || "General"}
            </button>
            <Link href={`/article/${article.id}`}>
              <h3 className="ml-2 text-gray-500 hover:bg-gray-300 p-3 rounded-full">
                Read more...
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleEdit}>
              <Image
                className="hover:bg-gray-300 p-2"
                src={editIcon}
                alt="edit"
                width={40}
                height={40}
              />
            </button>
            <button onClick={handleDelete}>
              <Image
                className="hover:bg-gray-300 p-2"
                src={deleteIcon}
                alt="delete"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPost;
