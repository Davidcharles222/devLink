import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}//posso utilizar de todos elementos que existe dentro de um input

const Input = (props: InputProps) => {
  return (
    <input
      className="bg-white border-0 h-9 rounded-md outline-none px-2 mb-3"
      {...props}
    />
  );
};

export default Input;
