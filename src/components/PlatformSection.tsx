import { Link } from 'react-router-dom'

const PlatformSection = () => {
  return (
    <div className="w-3/4 h-full flex flex-row gap-2 mb-6">
        <Link
          to="#"
          onClick={() => {}}
          className="w-1/4 h-full group"
        >
          <span className="w-full h-full flex items-center justify-center rounded-2xl bg-off-white group-hover:bg-[#0F1035]">
            <p className="font-teko text-[#0F1035] text-3xl group-hover:text-off-white my-1">
              PC
            </p>
          </span>
        </Link>
        <Link
          to="#"
          onClick={() => {}}
          className="w-1/4 h-full group"
        >
          <span className="w-full h-full flex items-center justify-center rounded-2xl bg-off-white group-hover:bg-[#0F1035]">
            <p className="font-teko text-[#0F1035] text-3xl group-hover:text-off-white my-1">
              Play Station
            </p>
          </span>
        </Link>
        <Link
          to="#"
          onClick={() => {}}
          className="w-1/4 h-full group"
        >
          <span className="w-full h-full flex items-center justify-center rounded-2xl bg-off-white group-hover:bg-[#0F1035]">
            <p className="font-teko text-[#0F1035] text-3xl group-hover:text-off-white my-1">
              Xbox
            </p>
          </span>
        </Link>
        <Link
          to="#"
          onClick={() => {}}
          className="w-1/4 h-full group"
        >
          <span className="w-full h-full flex items-center justify-center rounded-2xl bg-off-white group-hover:bg-[#0F1035]">
            <p className="font-teko text-[#0F1035] text-3xl group-hover:text-off-white my-1">
              Nintendo Switch
            </p>
          </span>
        </Link>
      </div>
  )
}

export default PlatformSection