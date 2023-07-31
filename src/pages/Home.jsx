import Container from "../components/UI/Container";
import Content from "../components/UI/Content";
import Heading from "../components/UI/Heading";
import Header from "../components/layouts/Header";
import classes from "../style/inputs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { brandSliceActions } from "../store/brandSlice";
import { themeSliceActions } from "../store/themeSlice";
import Button from "../components/UI/Button";
import { useEffect } from "react";
import { applicationsAction } from "../store/applicationsSlice";

const Home = () => {
  const appData = useActionData();
  const dispatch = useDispatch();
  const { desc, img, name, heading, color } = useLoaderData();
  dispatch(brandSliceActions.changeDetails({ desc, img, name, heading }));
  dispatch(themeSliceActions.changeColor(color));
  useEffect(() => {
    if (appData) {
      dispatch(applicationsAction.addNewApplication(appData));
    }
  }, [appData]);

  return (
    <>
      <Header />
      <Form className=" px-8 wrapper py-16" method="post">
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
            />
            <label htmlFor="name" className={classes.entered}>
              Name
            </label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="lastname"
              style={{ borderColor: color }}
            />
            <label htmlFor="lastname">LastName</label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="email"
              name="email"
              style={{ borderColor: color }}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="number"
              name="phone"
              style={{ borderColor: color }}
            />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="text"
              name="city"
              style={{ borderColor: color }}
            />
            <label htmlFor="city">City</label>
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
        <div className="flex flex-col gap-y-16">
          <div className=" flex flex-col gap-y-4">
            <Heading>Vacancy</Heading>
            <Content>
              Please choose a position which you are applying for.
            </Content>
            <div className={classes.inputCtn}>
              <select
                name="vacancy"
                className={classes.input}
                style={{ borderColor: color }}
              >
                <option value="Fornt End Developer">Front End Developer</option>
                <option value="Back End Developer">Back End Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Heading>Net Financial Requirements</Heading>
            <Content>Tel us about your salary requirements</Content>
            <div className={`${classes.inputCtn} ${classes.salary}`}>
              <input
                className={classes.input}
                type="number"
                name="salary"
                min="0"
                style={{ borderColor: color }}
              />
              <label htmlFor="salary">Salary</label>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Heading>CV/Resume</Heading>
            <Content>Attach file with your Resume/CV.</Content>
            <div className={classes.inputCtn}>
            <input
              className={classes.input}
              type="file"
              name="resume"
              id="resume"
              style={{ borderColor: color }}
            />
            </div>
          </div>
        </div>
        <Button>Apply</Button>
      </Form>
    </>
  );
};

export default Home;

export const Homeloader = async () => {
  const docRef = doc(db, "brand", "brand_info");
  const docSnap = await getDoc(docRef);
  const docRef2 = doc(db, "colors", "mainColor");
  const docSnap2 = await getDoc(docRef2);
  const data = { ...docSnap.data(), ...docSnap2.data() };
  if (data) {
    return data;
  } else {
    console.log("No such document!");
  }
};
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
  };
  return applicationData;
};
