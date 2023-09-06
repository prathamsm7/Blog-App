import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Signin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { isLoading, isError } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let response = dispatch(userLogin(user));
    response.then((res) => {
      if (res.type.includes("rejected")) {
        toast.error(res.payload.message);
        return;
      } else {
        navigate("/");
      }
    });
  }

  const { email, password } = user;

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="w-full h-[100svh] flex justify-center items-center">
      <ToastContainer />

      <div className="border w-1/3 bg-slate-500 py-3 px-4 rounded-lg shadow-md text-white">
        <h1 className="text-xl font-bold text-center">Sign In</h1>
        <form
          className="rounded px-8 pt-6 pb-8 w-full"
          action=""
          onSubmit={handleSubmit}
        >
          <label className="block text-sm font-bold mb-1">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-3"
            type="email"
            value={email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter Your Email"
            required
          />
          <label className="block text-sm font-bold mb-1">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-3"
            type="password"
            value={password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter Your Password"
            required
          />
          <button
            className="border-2 border-green-500 p-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <p className="mt-3">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-300 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
