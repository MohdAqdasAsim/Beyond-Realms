import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-1/3 flex items-start flex-col rounded-2xl overflow-hidden p-4">
        <h1 className="text-[#232e52] font-teko">Site Not Found</h1>
        <p className="text-black text-opacity-35 text-2xl font-teko mb-4">
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on Beyound Realms.
        </p>

        <span className="w-full flex items-center">
          <img
            src="/icons/arrow.svg"
            alt="arrow-right"
            className="w-3 h-3 rotate-180"
          />
          <Link to="/" className="text-xl font-teko text-[#232e52] hover:text-black text-center underline">
            Back to enjoying more games!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
