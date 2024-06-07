"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlesPost from "../components/ArticlesPost";
import { useRouter } from "next/navigation";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: [string];
  views: number;
}

const Articles = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        setArticles(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen px-40 py-6 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching articles: {error.message}</p>;
  }

  return (
    <div className="min-h-screen px-40 py-6">
      {articles.map((article) => (
        <ArticlesPost article={article} />
      ))}
    </div>
  );
};

export default Articles;
