import { useSelector, useDispatch } from "react-redux";
import Heading from "../components/UI/Heading";
import InputCtn from "../components/UI/InputCtn";
import classes from "../style/inputs.module.scss";
import { brandSliceActions } from "../store/brandSlice";
import { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Button from "../components/UI/Button";

const Brand = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.brand.name);
  const img = useSelector((state) => state.brand.img);
  const heading = useSelector((state) => state.brand.heading);
  const desc = useSelector((state) => state.brand.desc);

  const [inputName, setInputName] = useState(name);
  const [inputImg, setInputImg] = useState(img);
  const [inputHeading, setInputHeading] = useState(heading);
  const [inputDesc, setInputDesc] = useState(desc);

  const color = useSelector((state) => state.theme.color);

  const handleBrandName = (e) => {
    setInputName(e.target.value);
  };
  const handleBrandImg = (e) => {
    setInputImg(e.target.value);
  };
  const handleBrandHeading = (e) => {
    setInputHeading(e.target.value);
  };
  const handleBrandDesc = (e) => {
    setInputDesc(e.target.value);
  };

  const mainObj = {
    name: inputName,
    img: inputImg,
    heading: inputHeading,
    desc: inputDesc,
  };

  const handleChangeDetails = () => {
    dispatch(brandSliceActions.changeDetails(mainObj));
    sendInfo(mainObj);
  };

  const sendInfo = async ({ name, img, heading, desc }) => {
    try {
      await setDoc(doc(db, "brand", "brand_info"), {
        desc,
        img,
        name,
        heading,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="inline-flex w-full p-8 flex-wrap gap-8 flex-col items-center wrapper">
      <Heading>Brand Info</Heading>
      <div className={`${classes.ctn}`}>
        <InputCtn>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="name"
              value={inputName}
              onChange={handleBrandName}
              style={{ borderColor: color }}
            />
            <label htmlFor="name">Brand Name</label>
          </div>
        </InputCtn>
        <InputCtn>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="name"
              value={inputImg}
              onChange={handleBrandImg}
              style={{ borderColor: color }}
            />
            <label htmlFor="name">Brand Img</label>
          </div>
        </InputCtn>
        <div className="flex gap-8 flex-col-reverse md:flex-row">
          <div>
            <InputCtn>
              <div className={classes.inputCtn}>
                <input
                  className={classes.input}
                  type="text"
                  name="name"
                  value={inputHeading}
                  onChange={handleBrandHeading}
                  style={{ borderColor: color }}
                />
                <label htmlFor="name">Brand Heading</label>
              </div>
            </InputCtn>
            <Button clickFn={handleChangeDetails}>Change</Button>
          </div>
          <InputCtn>
            <div className={classes.inputCtn}>
              <textarea
                className={`${classes.input}`}
                type="text"
                name="name"
                value={inputDesc}
                onChange={handleBrandDesc}
                style={{ borderColor: color, height: "12rem" }}
              ></textarea>
              <label htmlFor="name">Brand Description</label>
            </div>
          </InputCtn>
        </div>
      </div>
    </section>
  );
};
export default Brand;
