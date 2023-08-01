import { useDispatch, useSelector } from "react-redux";
import Heading from "../components/UI/Heading";
import { themeSliceActions } from "../store/themeSlice";
import { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
const Theme = () => {
  const color = useSelector((state) => state.theme.color);
  const dispatch = useDispatch();
  const [mainColor, setMainColor] = useState(color);

  const colorHandler = (e) => {
    setMainColor(e.target.value);
  };

  const submitColor = () => {
    dispatch(themeSliceActions.changeColor(mainColor));
    name(mainColor);
  };

  const name = async (color) => {
    await setDoc(doc(db, "colors", "mainColor"), {
      color,
    });
  };

  return (
    <section className="p-16">
      <Heading>Theme changer</Heading>
      <div className="mt-8">
        <div className="flex items-center gap-x-4">
          <input
            className=" h-12 w-12"
            type="color"
            id="main"
            name="main"
            onChange={colorHandler}
            value={mainColor}
          />
          <label className="text-lg" htmlFor="main">
            Main Color
          </label>
        </div>
        <button
          className="mt-4 px-4 py-2 text-xl border-solid border-2"
          style={{ borderColor: color }}
          onClick={submitColor}
        >
          Change
        </button>
      </div>
    </section>
  );
};
export default Theme;
