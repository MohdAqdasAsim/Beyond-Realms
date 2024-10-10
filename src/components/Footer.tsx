import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full p-12 sm:px-12 px-4 flex flex-col items-center justify-center shadow-lg bg-[#0c1532]">
      <div className="w-full flex-1 my-4">
        <p className="font-teko text-2xl">About</p>
        <p className="font-comfortaa text-sm text-opacity-40">
          This website is a study project aimed at enhancing my web development
          skills by creating an interactive gaming library. Utilizing data
          provided by the RAWG API, I’ve developed a platform that allows users
          to explore a vast collection of games, complete with descriptions,
          ratings, and additional information.
          <br />
          This project reflects my passion for gaming and web design, serving as
          a practical application of the concepts I've learned in my studies. If
          you have any queries or feedback, feel free to message me on my social
          media channels!
        </p>
      </div>
      <div className="w-full h-16 flex flex-col md:flex-row border-white border-t-2">
        <span className="w-full h-full items-center flex sm:text-lg text-sm md:text-xl">
          Developed by&nbsp;
          <a
            href="https://mohdaqdasasim.netlify.app/"
            target="_blank"
            className="underline text-white hover:text-off-white"
          >
            Mohd Aqdas Asim
          </a>&nbsp;
          using data provided by&nbsp;
          <a
            href="https://rawg.io"
            target="_blank"
            className="underline text-white hover:text-off-white"
          >
            RAWG API
          </a>
          .
        </span>

        <span className="w-full h-full items-center flex justify-center gap-2 sm:mt-4 md:mt-0 mt-4">
          <Link to="https://www.linkedin.com/in/mohd-aqdas-asim" className="w-12 h-12 border-2 hover:border-[#717989] hover:bg-[#717989] bg-transparent border-white rounded-full flex items-center justify-center">
            <img src="/icons/linkedin.svg" alt="linkedin" className="w-6 h-6" />
          </Link>
          <Link to="https://github.com/MohdAqdasAsim" className="w-12 h-12 border-2 hover:border-[#717989] hover:bg-[#717989] bg-transparent border-white rounded-full flex items-center justify-center">
            <img src="/icons/github.svg" alt="github" className="w-6 h-6" />
          </Link>
          <Link to="https://www.instagram.com/mohdaqdasasim/" className="w-12 h-12 border-2 hover:border-[#717989] hover:bg-[#717989] bg-transparent border-white rounded-full flex items-center justify-center">
            <img src="/icons/instagram.svg" alt="instagram" className="w-6 h-6" />
          </Link>
          <Link to="https://discordapp.com/users/1211269839398637590" className="w-12 h-12 border-2 hover:border-[#717989] hover:bg-[#717989] bg-transparent border-white rounded-full flex items-center justify-center">
            <img src="/icons/discord.svg" alt="discord" className="w-6 h-6" />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
