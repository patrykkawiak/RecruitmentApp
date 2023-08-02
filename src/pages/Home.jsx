import Container from "../components/UI/Container";
import Content from "../components/UI/Content";
import Heading from "../components/UI/Heading";
import Header from "../components/layouts/Header";
import classes from "../style/inputs.module.scss";
import { useDispatch } from "react-redux";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { brandSliceActions } from "../store/brandSlice";
import { themeSliceActions } from "../store/themeSlice";
import Button from "../components/UI/Button";
import { useEffect } from "react";
import { applicationsAction } from "../store/applicationsSlice";
import { useState } from "react";
import Modal from "../components/Modal";
import ReactDOM from "react-dom";

const Home = () => {
  const appData = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { heading, desc, color, img, name } = useLoaderData();
  dispatch(themeSliceActions.changeColor(color));
  dispatch(brandSliceActions.changeDetails({ desc, img, name, heading }));
  // const { heading, desc } = useSelector((state) => state.brand);
  // const color = useSelector((state) => state.theme.color);

  const [nameValid, setNameValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [cityValid, setCityValid] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);

  const [salaryValid, setSalaryValid] = useState(false);
  const [salaryTouched, setSalaryTouched] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const [modal, setModal] = useState(false);

  const nameValidation = (e) => {
    if (e.target.value.length > 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    setNameTouched(true);
  };
  const lastNameValidation = (e) => {
    if (e.target.value.length > 0) {
      setLastNameValid(true);
    } else {
      setLastNameValid(false);
    }
    setLastNameTouched(true);
  };
  const emailValidation = (e) => {
    if (e.target.value.includes("@") && e.target.value.includes(".")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmailTouched(true);
  };
  const phoneValidation = (e) => {
    if (e.target.value.match("[0-9]") && e.target.value.trim().length == 9) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setPhoneTouched(true);
  };
  const cityValidation = (e) => {
    if (e.target.value.trim().length > 0) {
      setCityValid(true);
    } else {
      setCityValid(false);
    }
    setCityTouched(true);
  };
  const salaryValidation = (e) => {
    if (
      e.target.value.match("[0-9]") &&
      e.target.value.trim().length > 0 &&
      e.target.value > 0
    ) {
      setSalaryValid(true);
    } else {
      setSalaryValid(false);
    }
    setSalaryTouched(true);
  };

  useEffect(() => {
    if (appData) {
      dispatch(applicationsAction.addNewApplication(appData));
    }
  }, [appData]);

  useEffect(() => {
    if (
      nameValid &&
      lastNameValid &&
      emailValid &&
      phoneValid &&
      cityValid &&
      salaryValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    nameValid,
    lastNameValid,
    emailValid,
    phoneValid,
    cityValid,
    salaryValid,
  ]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    navigate("/finish");
  };

  const portal = ReactDOM.createPortal(
    <Modal desc={'Application sent'} close={closeModal}>Close</Modal>,
    document.getElementById("modal")
  );

  return (
    <>
      {modal && portal}
      <Header />
      <Form className=" px-8 wrapper py-16" method="post" onSubmit={openModal}>
        <Container>
          <Heading>{heading}</Heading>
          <Content>{desc}</Content>
        </Container>
        <Container>
          <Heading>Contact details</Heading>
          <Content>Please add your contact details here.</Content>
        </Container>
        <div className={classes.ctn}>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="name"
              id="name"
              style={{ borderColor: color }}
              onBlur={nameValidation}
            />
            <label
              htmlFor="name"
              style={{ color: !nameValid && nameTouched ? "red" : "" }}
              className={classes.entered}
            >
              Name {!nameValid && nameTouched ? "cannot be empty!" : "*"}
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="lastname"
              style={{ borderColor: color }}
              onBlur={lastNameValidation}
            />
            <label
              htmlFor="lastname"
              style={{ color: !lastNameValid && lastNameTouched ? "red" : "" }}
            >
              Lastname{" "}
              {!lastNameValid && lastNameTouched ? "cannot be empty!" : "*"}
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="email"
              name="email"
              style={{ borderColor: color }}
              onBlur={emailValidation}
            />
            <label
              htmlFor="email"
              style={{ color: !emailValid && emailTouched ? "red" : "" }}
            >
              Email {!emailValid && emailTouched ? "is wrong!" : "*"}
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="number"
              name="phone"
              style={{ borderColor: color }}
              onBlur={phoneValidation}
            />
            <label
              htmlFor="phone"
              style={{ color: !phoneValid && phoneTouched ? "red" : "" }}
            >
              Phone{" "}
              {!phoneValid && phoneTouched ? "number has wrong format!" : "*"}
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="city"
              style={{ borderColor: color }}
              onBlur={cityValidation}
            />
            <label
              htmlFor="city"
              style={{ color: !cityValid && cityTouched ? "red" : "" }}
            >
              City {!cityValid && cityTouched ? "cannot be empty!" : "*"}
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="job"
              style={{ borderColor: color }}
            />
            <label htmlFor="job">Job</label>
          </div>
        </div>
        <div className="flex flex-col gap-y-16 mt-20">
          <div className=" flex flex-col gap-y-4">
            <Heading>Vacancy</Heading>
            <Content>
              Please choose a position which you are applying for.
            </Content>
            <div className={`${classes.inputCtn} mx-auto mt-8`}>
              <select
                name="vacancy"
                className={classes.input}
                style={{ borderColor: color }}
              >
                <option value="Front End Developer">Front End Developer</option>
                <option value="Back End Developer">Back End Developer</option>
                <option value="Net Developer">Net Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Team Leader">Team Leader</option>
              </select>
              <label htmlFor="vacancy">Vacancy *</label>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Heading>Net Financial Requirements</Heading>
            <Content>Tel us about your salary requirements</Content>
            <div
              className={`${classes.inputCtn} ${classes.salary} mx-auto mt-8`}
            >
              <input
                className={classes.input}
                type="number"
                name="salary"
                min="0"
                style={{ borderColor: color }}
                onBlur={salaryValidation}
              />
              <label
                htmlFor="salary"
                style={{ color: !salaryValid && salaryTouched ? "red" : "" }}
              >
                Salary {!salaryValid && salaryTouched ? "is wrong!" : "*"}
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Heading>CV/Resume</Heading>
            <Content>Attach file with your Resume/CV.</Content>
            <div className={`${classes.inputCtn} mx-auto mt-8 mb-8`}>
              <input
                className={classes.input}
                type="file"
                name="resume"
                id="resume"
                style={{ borderColor: color }}
              />
              <label htmlFor="resume">CV *</label>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button disabled={formValid ? false : true}>
            {formValid ? "Apply" : "Enter all data first!"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Home;

export const HomeAction = async ({ request }) => {
  const formData = await request.formData();
  let id = Math.random();
  const applicationData = {
    id: id,
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    job: formData.get("job"),
    vacancy: formData.get("vacancy"),
    salary: formData.get("salary"),
    resume: formData.get("resume"),
    status: "open",
  };
  await addDoc(collection(db, "applications"), applicationData);

  return applicationData;
};

export const homeLoader = async () => {
  const brandInfo = doc(db, "brand", "brand_info");
  const brandSnap = await getDoc(brandInfo);
  const colorInfo = doc(db, "colors", "mainColor");
  const colorSnap = await getDoc(colorInfo);

  const data = { ...brandSnap.data(), ...colorSnap.data() };
  if (data) {
    return data;
  } else {
    console.log("error");
  }
};
