import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, likePost, updatePost } from "../store/slices/BlogSlics";
import { toast, ToastContainer } from "react-toastify";
const apiId = import.meta.env.VITE_API;

import { Cloudinary } from "@cloudinary/url-gen";

// Import the responsive plugin
import { AdvancedImage, responsive } from "@cloudinary/react";

function Post() {
  const { user, isAuthenticated } = useSelector((store) => store.user);

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_ID,
    },
  });

  const { isLoading } = useSelector((store) => store.blogs);
  const { id } = useParams();
  const [loading, setLoaing] = useState(true);
  const [post, setPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", text: "" });
  const { title, text, postedBy } = post;

  function removeExtraSpaces(inputString) {
    return inputString.replace(/\s+/g, " ").trim();
  }

  const getPost = async () => {
    try {
      const response = await axios.get(`${apiId}/post/${id}`, {
        withCredentials: true,
      });
      setPost(response.data);
      setLoaing(false);
    } catch (error) {
      setLoaing(false);
    }
  };

  const handleUpdatePost = () => {
    let trimTitle = removeExtraSpaces(blog.title || title);
    let trimText = removeExtraSpaces(blog.text || text);

    if (trimTitle.length < 30) {
      toast.info("Please enter blog title more than 30 characters");
      return;
    }

    if (trimText.length < 300) {
      toast.info("Please enter blog text more than 300 characters");
      return;
    }

    const dataToPass = {
      id: id,
      title: blog.title || title,
      text: blog.text || text,
    };

    let response = dispatch(updatePost(dataToPass));

    response.then((res) => {
      setIsEdit(false);
      if (res.meta.requestStatus == "fulfilled") {
        toast.success("Post Updated Succesfully");
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const handleDeletePost = () => {
    let response = dispatch(deletePost(id));

    response.then((res) => {
      setIsEdit(false);
      if (res.meta.requestStatus == "fulfilled") {
        toast.success("Post Delete Succesfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const handleLike = async (id) => {
    let responese = dispatch(likePost(id));
    responese.then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        setPost({ ...post, likes: res.payload.likes });
        toast.success(
          `Post ${res.payload.likes.includes(user._id) ? "Liked" : "Dislike"} `
        );
      } else {
        toast.info("Something went wrong");
      }
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  // Use the image with public ID, 'sample'.
  let myImage;
  if (post.image) {
    let imgStr = post.image.split("/");
    let imgId = imgStr[imgStr.length - 1].split(".")[0];
    myImage = cld.image(imgId);
  }

  return (
    <div className="md:w-4/6 p-3 md:p-8 m-auto">
      <ToastContainer />
      {loading ? (
        <div className="animate-pulse border border-blue-400 rounded-md p-4">
          <div className="h-2 bg-slate-500 rounded mb-5"></div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                </div>
                <div className="h-2 bg-slate-500 rounded"></div>
                <div className="h-2 bg-slate-500 rounded"></div>

                <div className="h-2 bg-slate-500 rounded"></div>

                <div className="h-2 bg-slate-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-blue-300 rounded-md p-4">
          {post.image && post.image != "" && (
            <AdvancedImage
              cldImg={myImage}
              plugins={[responsive({ steps: 100 })]}
              className="md:h-[500px] mx-auto mb-5 rounded-md"
            />
          )}

          {isEdit ? (
            <>
              <label className="block text-sm font-bold mb-1">Blog Title</label>
              <input
                className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
                type="text"
                defaultValue={title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                minLength={50}
                required
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
              <div className="flex gap-4 my-3">
                <p className="text-base font-semibold text-gray-400">
                  Posted By: {postedBy?.name}
                </p>{" "}
                <p className="text-sm text-gray-400">
                  ⌚ {new Date(post.createdAt).toLocaleString()}
                </p>
                <p
                  className="text-green-600 font-semibold hover:cursor-pointer"
                  onClick={() => handleLike(post._id)}
                >
                  👍 {post.likes.length}
                </p>
              </div>
            </>
          )}

          {isEdit ? (
            <>
              <label className="block text-sm font-bold mb-1">Blog Text</label>
              <textarea
                className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
                type="text"
                defaultValue={text}
                onChange={(e) => setBlog({ ...blog, text: e.target.value })}
                minLength={300}
                rows={10}
                required
              ></textarea>
            </>
          ) : (
            <p className="text-lg">{text}</p>
          )}

          {isAuthenticated && user.role == "admin" && (
            <div className="flex gap-5 my-5">
              <button
                className="border rounded-md p-2 font-bold border-blue-500 text-blue-500 hover:bg-blue-400 hover:border-white hover:text-white"
                onClick={() => setIsEdit((prev) => !prev)}
                disabled={isEdit}
              >
                Edit Post
              </button>
              {isEdit ? (
                <>
                  <button
                    className="border rounded-md p-2 font-bold border-red-500 text-red-500 hover:bg-red-400 hover:border-white hover:text-white"
                    onClick={handleUpdatePost}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating Post..." : "Update Post"}
                  </button>
                  <button
                    className="border rounded-md p-2 font-bold border-gray-500 text-gray-500 hover:bg-gray-400 hover:border-white hover:text-white"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    Cancel Edit
                  </button>
                </>
              ) : (
                <button
                  className="border rounded-md p-2 font-bold  border-green-500 text-green-600 hover:bg-green-500 hover:border-white hover:text-white"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
