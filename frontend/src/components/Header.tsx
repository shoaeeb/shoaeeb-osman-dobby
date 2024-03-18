import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container mx-auto pb-11">
      <div className="flex justify-end py-1">
        <Link
          to="/login"
          className="px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-400 "
        >
          Login
        </Link>
      </div>
    </div>
  );
};
export default Header;
