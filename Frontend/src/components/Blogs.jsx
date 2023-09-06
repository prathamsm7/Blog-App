import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slices/BlogSlics";
import Shimmer from "./Shimmer";
import { Link, useNavigate } from "react-router-dom";

function Blogs() {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((store) => store.blogs);
  const { isAuthenticated } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <main className="px-8 py-8">
      <div className="flex gap-5 w-full flex-wrap justify-between">
        {blogs && blogs.length ? (
          <>
            {blogs.map((post) => (
              <div
                key={post._id}
                className="border border-blue-300 shadow rounded-md p-4 w-[49%]"
              >
                <p className="text-lg font-bold my-2">{post.title}</p>
                <p>{post.text.slice(0, 100)}...</p>
                <Link
                  to={`/post/${post._id}`}
                  className="bg-sky-600 text-white font-semibold button border p-1 rounded-md"
                >
                  Read More...
                </Link>
              </div>
            ))}
          </>
        ) : (
          <Shimmer />
        )}
      </div>
    </main>
  );
}

export default Blogs;
