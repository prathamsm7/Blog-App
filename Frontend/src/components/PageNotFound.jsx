import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="w-full h-screen bg-slate-400 flex flex-col justify-center items-center gap-4">
      <p className="text-6xl font-bold">404</p>
      <p className="text-2xl font-bold">Page Not Found</p>
      <Link
        to="/"
        className="bg-sky-600 py-3 px-4 rounded-full text-white font-bold"
      >
        Go To Home Page
      </Link>
    </div>
  );
}

export default PageNotFound;
