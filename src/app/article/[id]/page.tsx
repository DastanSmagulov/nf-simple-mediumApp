"use client";
import axiosInstance from "@/app/axiosConfig";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

const ArticlePage = ({ params: { id } }: ArticlePageProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axiosInstance.get<Article>(`/posts/${id}`);
          setArticle(response.data);
          setLoading(false);
        } catch (err) {
          setError(err as Error);
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen px-20 py-6 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching article: {error.message}</p>;
  }

  if (!article) {
    return <p>No article found</p>;
  }

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="max-w-4xl max-lg:max-w-2xl max-md:max-w-xl max-sm:max-w-xs mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          {article.title}
        </h1>
        <div className="flex items-center mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                User ID: {article.userId}
              </h3>
              <span className="text-sm text-gray-500">
                Views: {article.views}
              </span>
            </div>
          </div>
        </div>
        <div className="prose prose-lg max-w-none mb-8 text-gray-800">
          <p>{article.body}</p>
        </div>
        <div className="flex items-center mb-8 space-x-4">
          {article?.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mb-6 space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">
              👍 {article?.reactions?.likes}
            </span>
            <span className="text-gray-600">
              👎 {article?.reactions?.dislikes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
