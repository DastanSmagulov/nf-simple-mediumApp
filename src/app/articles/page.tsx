"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlesPost from "../components/ArticlesPost";
import { useRouter } from "next/navigation";
import axiosInstance from "../axiosConfig";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: [string];
  views: number;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get("/posts");
        setArticles(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const deleteArticle = async (id: number) => {
    console.log(`Deleted article with id ${id}`);
  };

  const editArticle = (id: number) => {
    console.log(`Editing article with id ${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen px-20 py-6 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching articles: {error.message}</p>;
  }

  return (
    <div className="min-h-screen sm:px-20 px-10 py-20">
      {articles.map((article) => (
        <ArticlesPost
          key={article.id}
          article={article}
          onDelete={deleteArticle}
          onEdit={editArticle}
        />
      ))}
    </div>
  );
};

export default Articles;
