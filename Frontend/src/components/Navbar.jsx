import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../store/slices/UserSlice";

function Navbar() {
  const { isAuthenticated, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <nav className="h-16 bg-stone-600 text-yellow-100 flex items-center px-5 justify-between">
      <Link to="/" className="text-2xl font-bold">
        My-Blogs
      </Link>
      <div className="flex gap-5 text-base font-semibold">
        {!isAuthenticated ? (
          <>
            <Link to="/signin" style={{ padding: "10px" }}>
              Sign In
            </Link>
            <Link to="/signup" style={{ padding: "10px" }}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user.role == "admin" && (
              <>
                <Link to="/post/new">Create New Post</Link>
              </>
            )}
            <span
              className="cursor-pointer"
              onClick={() => dispatch(userLogout())}
            >
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
