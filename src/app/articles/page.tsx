"use client";
import React, { useEffect, useState } from "react";
import ArticlesPost from "../components/ArticlesPost";
import axiosInstance from "../axiosConfig";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  views: number;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [editedArticle, setEditedArticle] = useState<Article | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedBody, setEditedBody] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("");

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

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      const updatedArticles = articles.filter((article) => article.id !== id);
      setArticles(updatedArticles);
    } catch (err: Error) {
      console.error("Error deleting article:", err);
      setError(err);
    }
  };

  const handleEdit = (id: number) => {
    const articleToEdit = articles.find((article) => article.id === id);
    if (articleToEdit) {
      setEditedArticle(articleToEdit);
      setEditedTitle(articleToEdit.title);
      setEditedBody(articleToEdit.body);
      setShowEditPopup(true);
    }
  };

  const handleEditSubmit = async () => {
    if (!editedArticle) return;

    try {
      const response = await axiosInstance.put(`/posts/${editedArticle.id}`, {
        title: editedTitle,
        body: editedBody,
      });

      const updatedArticle = response.data;
      const updatedArticles = articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      );
      setArticles(updatedArticles);
      setShowEditPopup(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting article:", err);
        setError(err);
      }
    }
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axiosInstance.post("/posts/add", {
        title: newTitle,
        body: newBody,
        userId: Math.floor(Math.random() * 100),
        tags: newTags.split(",").map((tag) => tag.trim()),
        views: 0,
      });

      const newArticle = response.data;
      const updatedArticles = [...articles, newArticle];
      setArticles(updatedArticles);
      setShowAddPopup(false);
      setNewTitle("");
      setNewBody("");
      setNewTags("");
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error adding article:", err);
        setError(err);
      }
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
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-900 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowAddPopup(true)}
        >
          Add Article
        </button>
      </div>
      {articles.map((article) => (
        <ArticlesPost
          key={article.id}
          article={article}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {showEditPopup && editedArticle && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full rounded-md bg-white"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 p-2 mb-4 w-full rounded-md bg-white"
              placeholder="Body"
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-300 mr-4 text-black px-4 py-2 rounded-md"
                onClick={() => setShowEditPopup(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full rounded-md bg-white"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 p-2 mb-2 w-full rounded-md bg-white"
              placeholder="Body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            ></textarea>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 w-full rounded-md bg-white"
              placeholder="Tags (comma separated)"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-300 mr-4 text-black px-4 py-2 rounded-md"
                onClick={() => setShowAddPopup(false)}
              >
                Close
              </button>
              <button
                className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-md"
                onClick={handleAddSubmit}
              >
                Add Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
