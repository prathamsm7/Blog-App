import axios from "axios";
import { useState } from "react";

function NewPost() {
  const [blog, setBlog] = useState({ title: "", text: "" });

  const { title, text } = blog;

  function removeExtraSpaces(inputString) {
    return inputString.replace(/\s+/g, " ").trim();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let trimTitle = removeExtraSpaces(title);
    let trimText = removeExtraSpaces(text);

    if (trimTitle.length < 30) {
      alert("Please enter blog title more than 30 characters");
      return;
    }

    if (trimText.length < 300) {
      alert("Please enter blog text more than 300 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/post/create",
        { title: trimTitle, text: trimText },
        { withCredentials: true }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="px-8 py-8">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>

      <form action="" className="mt-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-bold mb-1">Blog Title</label>
        <input
          className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
          type="text"
          value={title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          minLength={50}
          required
        />
        <label className="block text-sm font-bold mb-1">Blog Text</label>
        <textarea
          className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
          type="text"
          value={text}
          onChange={(e) => setBlog({ ...blog, text: e.target.value })}
          rows={10}
          minLength="300"
          pattern=".{300,}"
          required
          title="Text must be at least 300 characters long"
        ></textarea>
        <button className="border-2 border-green-500 p-2 rounded-lg">
          Create New Post
        </button>
      </form>
    </main>
  );
}

export default NewPost;
