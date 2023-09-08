import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/slices/BlogSlics";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function NewPost() {
  const [blog, setBlog] = useState({ title: "", text: "" });
  const [image, setImage] = useState("");
  const { isLoading } = useSelector((store) => store.blogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, text } = blog;

  function removeExtraSpaces(inputString) {
    return inputString.replace(/\s+/g, " ").trim();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let trimTitle = removeExtraSpaces(title);
    let trimText = removeExtraSpaces(text);

    if (trimTitle.length < 30) {
      toast.error("Please enter blog title more than 30 characters");
      return;
    }

    if (trimText.length < 300) {
      toast("Please enter blog text more than 300 characters");
      return;
    }

    const formData = new FormData();
    formData.append("content", JSON.stringify(title, text));
    formData.append("image", image);

    const response = dispatch(createPost(formData));

    response.then((res) => {
      setBlog({ title: "", text: "" });
      if (res.meta.requestStatus == "fulfilled") {
        toast.success("Post Created Succesfully");
      } else {
        toast.error(res.payload.message);
      }
    });
  }

  return (
    <main className="px-8 py-8">
      <ToastContainer />

      <h1 className="text-3xl font-bold">Create New Blog Post</h1>

      <form action="" className="mt-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-bold mb-1">Image</label>
        <input
          className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          placeholder="Upload Image"
          required
        />
        <label className="block text-sm font-bold mb-1">Blog Title</label>
        <input
          className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
          type="text"
          value={title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          minLength={50}
          placeholder="Enter Post Title"
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
          placeholder="Enter Post Text"
        ></textarea>
        <button
          className="border-2 border-green-500 p-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Creating New Post..." : "Create New Post"}
        </button>
      </form>
    </main>
  );
}

export default NewPost;
