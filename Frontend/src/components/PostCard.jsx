import { Link, useNavigate } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div
      key={post._id}
      className="border border-blue-300 shadow rounded-md p-4 md:w-[48%]"
    >
      <p className="text-lg font-bold my-2">{post.title}</p>
      {post.image && post.image != "" && <img src={post.image} />}
      <p className="mb-4">{post.text.slice(0, 100)}...</p>
      <Link
        to={`/post/${post._id}`}
        className="bg-sky-600 text-white font-semibold button border p-1 rounded-md"
      >
        Read More...
      </Link>
    </div>
  );
}

export default PostCard;
