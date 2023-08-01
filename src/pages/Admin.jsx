import { useDispatch, useSelector } from "react-redux";
import Card from "../components/UI/Card";
import { useLoaderData } from "react-router-dom";
import { brandSliceActions } from "../store/brandSlice";
import { themeSliceActions } from "../store/themeSlice";
import { applicationsAction } from "../store/applicationsSlice";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Admin = () => {
  const { desc, img, name, heading, color, appsArr } = useLoaderData();
  const dispatch = useDispatch();
  dispatch(brandSliceActions.changeDetails({ desc, img, name, heading }));
  dispatch(themeSliceActions.changeColor(color));
  dispatch(applicationsAction.updateApplications(appsArr));

  const totalApplications = useSelector(
    (state) => state.applications.totalCount
  );
  const items = useSelector((state) => state.applications.items);

  const openApplications = items.filter(
    (item) => item.status === "open"
  ).length;
  const rejectedApplications = items.filter(
    (item) => item.status === "rejected"
  ).length;
  const acceptedApplications = items.filter(
    (item) => item.status === "accept"
  ).length;

  return (
    <div className="inline-flex p-8 flex-wrap gap-8 h-full justify-center">
      <Card>
        <div className="flex h-full flex-col justify-center items-center gap-8">
          <i className="bx bxs-user text-7xl" style={{ color }}></i>
          <p className="text-2xl">
            Applications Count:{" "}
            <span style={{ color }} className="text-3xl">
              {totalApplications}
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <div className="flex h-full flex-col justify-center items-center gap-8">
          <i className="bx bx-folder-open text-7xl" style={{ color }}></i>
          <p className="text-2xl">
            Open Applications:{" "}
            <span style={{ color }} className="text-3xl">
              {openApplications}
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <div className="flex h-full flex-col justify-center items-center gap-8">
          <i className="bx bxs-x-square text-7xl" style={{ color }}></i>
          <p className="text-2xl">
            Rejected Applications:{" "}
            <span style={{ color }} className="text-3xl">
              {rejectedApplications}
            </span>
          </p>
        </div>
      </Card>
      <Card>
        <div className="flex h-full flex-col justify-center items-center gap-8">
          <i className="bx bxs-check-square text-7xl" style={{ color }}></i>
          <p className="text-2xl">
            Accepted Applications:{" "}
            <span style={{ color }} className="text-3xl">
              {acceptedApplications}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Admin;

export const adminLoader = async () => {
  const docRef = doc(db, "brand", "brand_info");
  const docSnap = await getDoc(docRef);
  const docRef2 = doc(db, "colors", "mainColor");
  const docSnap2 = await getDoc(docRef2);
  const querySnapshot = await getDocs(collection(db, "applications"));
  const appsArr = [];
  querySnapshot.forEach((doc) => appsArr.push(doc.data()));
  const data = { ...docSnap.data(), ...docSnap2.data(), appsArr };

  if (data) {
    return data;
  } else {
    console.log("No such document!");
  }
};
