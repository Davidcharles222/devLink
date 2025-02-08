import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <>
      <div className="m-auto flex items-center justify-center mt-[20%]">
        <h4 className="flex gap-2 text-white text-4xl">
          Carregando...{" "}
          <FaSpinner className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        </h4>
      </div>
    </>
  );
};

export default Loading;
