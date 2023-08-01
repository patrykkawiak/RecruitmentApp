import { useSelector } from "react-redux";

const Button = (props) => {
  const color = useSelector((state) => state.theme.color);
  return (
    <button
      className={`mt-4 px-4 py-2 text-white text-xl transition transform duration-300 hover:scale-95 rounded-lg`}
      style={{ backgroundColor: color }}
      onClick={props.clickFn ? props.clickFn : null}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default Button;
