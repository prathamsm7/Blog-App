import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slices/BlogSlics";
import Shimmer from "./Shimmer";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

function Blogs() {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((store) => store.blogs);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <main className="px-5 py-8">
      <div className="flex gap-5 w-full flex-wrap justify-between">
        {blogs && blogs.length ? (
          <>
            {blogs.map((post) => (
              <PostCard post={post} key={post._id} />
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
