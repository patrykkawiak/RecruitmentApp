import { useSelector } from "react-redux";

const Button = (props) => {
  const color = useSelector((state) => state.theme.color);

  return (
    <button
      className="mt-4 px-4 py-2 text-xl border-solid border-2"
      style={{ borderColor: color }}
      onClick={props.clickFn ? props.clickFn : null}
    >
      {props.children}
    </button>
  );
};
export default Button;
