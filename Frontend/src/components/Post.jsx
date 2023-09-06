import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, updatePost } from "../store/slices/BlogSlics";

function Post() {
  const { user, isAuthenticated } = useSelector((store) => store.user);
  const { id } = useParams();
  const [loading, setLoaing] = useState(true);
  const post = useRef({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", text: "" });

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/post/${id}`, {
        withCredentials: true,
      });
      post.current = response.data;

      setLoaing(false);
    } catch (error) {
      setLoaing(false);
      console.log(error);
    }
  };

  const handleUpdatePost = () => {
    const dataToPass = {
      id: id,
      title: blog.title || title,
      text: blog.text || text,
    };

    let response = dispatch(updatePost(dataToPass));

    response
      .then(() => {
        setIsEdit(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        setIsEdit(false);
      });
  };

  const handleDeletePost = () => {
    let response = dispatch(deletePost(id));

    response
      .then(() => {
        setIsEdit(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        setIsEdit(false);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const { title, text, postedBy } = post.current;

  return (
    <div className="px-8 py-8">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-2 bg-slate-500 rounded mb-5"></div>
          <div className="flex space-x-4">
            <div className="rounded-full bg-slate-500 h-10 w-10"></div>
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
        <div className="border border-blue-300 rounded-md p-2">
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
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-base font-semibold text-gray-400 my-3">
                Posted By: {postedBy?.name}
              </p>
            </>
          )}

          {isEdit ? (
            <>
              <label className="block text-sm font-bold mb-1">Blog Text</label>
              <textarea
                className="shadow border border-blue-300 rounded w-full py-2 px-1 text-black mb-3"
                type="text"
                defaultValue={text}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
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
                  >
                    Update Post
                  </button>
                  <button
                    className="border rounded-md p-2 font-bold border-gray-500 text-gray-500 hover:bg-gray-400 hover:border-white hover:text-white"
                    onClick={() => setIsEdit((prev) => !prev)}
                    disabled={title == post.title}
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
