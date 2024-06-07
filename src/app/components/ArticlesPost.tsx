import Link from "next/link";

const ArticlesPost = ({ article }: any) => {
  return (
    <div
      className="flex mb-20 p-6 bg-white rounded-lg shadow-md"
      key={article.id}
    >
      <Link href={`/article/${article.id}`}>
        <div className="mr-40">
          <div className="flex items-center mb-4">
            <h3 className="font-bold">User ID: {article.userId}</h3>
            <span className="ml-1 text-gray-500">Views: {article.views}</span>
          </div>
          <div className="mb-16">
            <p className="text-xl font-bold" id="title">
              {article.title}
            </p>
            <p className="mt-6 mb-16 text-base" id="summary">
              {article.body}
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-gray-100 text-blue-900 py-1 px-4 rounded-full font-medium text-sm">
              {article.tags[0] || "General"}
            </button>
            <h3 className="ml-2 text-gray-500">Selected for you</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticlesPost;
