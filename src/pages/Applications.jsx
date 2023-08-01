import { useSelector, useDispatch } from "react-redux";
import { applicationsAction } from "../store/applicationsSlice";
import Application from "../components/Application";
import { useState } from "react";
import Modal from "../components/Modal";
import ReactDOM from "react-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Applications = (params) => {
  const applications = useSelector((state) => state.applications.items);
  const [querry, setQuery] = useState("all");
  const [filter, setFilter] = useState("none");
  const [modal, setModal] = useState(false);
  const [appId, setAppId] = useState(null);
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModal(false);
  };

  const handleAcceptApplication = async (id) => {
    setModal(true);
    setAppId(id);
    setAction("accept");
  };

  const handlerRejectApplication = async (id) => {
    setModal(true);
    setAction("reject");
    setAppId(id);
  };

  const handlerRemoveApplication = async (id) => {
    setModal(true);
    setAction("remove");
    setAppId(id);
  };
  const acceptModal = () => {
    if (action === "accept") {
      acceptApplication(appId);
      setAction(null);
    } else if (action === "reject") {
      rejectApplication(appId);
      setAction(null);
    } else if (action === "remove") {
      removeApplication(appId);
      setAction(null);
    }
    setModal(false);
  };

  const acceptApplication = async (id) => {
    dispatch(applicationsAction.addAcceptStatus(id));
    let docID;
    const q = query(collection(db, "applications"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });

    const ref = doc(db, "applications", docID);
    await updateDoc(ref, {
      status: "accept",
    });
  };

  const rejectApplication = async (id) => {
    dispatch(applicationsAction.addRejectStatus(id));
    let docID;
    const q = query(collection(db, "applications"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });

    const ref = doc(db, "applications", docID);
    await updateDoc(ref, {
      status: "rejected",
    });
  };

  const removeApplication = async (id) => {
    dispatch(applicationsAction.removeApplication(id));
    let docID;
    const q = query(collection(db, "applications"), where("id", "==", id));
    const itemToDelete = await getDocs(q);
    itemToDelete.forEach((doc) => {
      docID = doc.id;
    });
    await deleteDoc(doc(db, "applications", docID));
  };
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };
  const filterHandler = (e) => {
    setFilter(e.target.value.split(" "));
  };

  let queryApplications;

  if (querry !== "all") {
    queryApplications = applications.filter((app) => app.status === querry);
  } else {
    queryApplications = applications;
  }

  if (filter !== "none") {
    const sortArray = [...queryApplications];
    if (filter[0] === "salary") {
      const sortParam = filter[1];

      if (sortParam === "asc") {
        sortArray.sort((a, b) => a.salary - b.salary);
      } else if (sortParam === "desc") {
        sortArray.sort((a, b) => b.salary - a.salary);
      }
    }
    if (filter[0] === "vacancy") {
      sortArray.sort();
    }
    queryApplications = sortArray;
  } else {
  }

  return (
    <section className="w-full">
      {modal &&
        ReactDOM.createPortal(
          <Modal
            close={closeModal}
            onAccept={acceptModal}
            accept={true}
            desc={"Are you sure?"}
          >
            No
          </Modal>,
          document.getElementById("modal")
        )}
      <div className=" h-20 w-full bg-zinc-200 flex items-center px-8 gap-8">
        <div className="flex gap-4 items-center">
          <p>Category:</p>
          <select name="category" className="w-24 h-8" onChange={queryHandler}>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="accept">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <p>Sort by:</p>
          <select name="filter" className="w-24 h-8" onChange={filterHandler}>
            <option value="none">None</option>
            <option value="salary desc">Salary DESC</option>
            <option value="salary asc">Salary ASC</option>
            <option value="vacancy">Vacancy</option>
          </select>
        </div>
      </div>
      <div className="p-8 flex flex-wrap items-center justify-center gap-8">
        {queryApplications.map((application) => (
          <Application
            key={application.id}
            id={application.id}
            name={application.name}
            lastname={application.lastname}
            email={application.email}
            phone={application.phone}
            city={application.city}
            job={application.job}
            vacancy={application.vacancy}
            salary={application.salary}
            resume={application.resume}
            status={application.status}
            removeHandler={() => handlerRemoveApplication(application.id)}
            acceptHandler={() => handleAcceptApplication(application.id)}
            rejectHandler={() => handlerRejectApplication(application.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Applications;
