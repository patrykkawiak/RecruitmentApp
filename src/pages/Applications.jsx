import { useSelector, useDispatch } from "react-redux";
import Button from "../components/UI/Button";
import { applicationsAction } from "../store/applicationsSlice";
import Application from "../components/Application";
import { useState } from "react";

const Applications = (params) => {
  const applications = useSelector((state) => state.applications.items);
  const [query, setQuery] = useState("all");
  const dispatch = useDispatch();

  const handleAcceptApplication = (id) => {
    dispatch(applicationsAction.addAcceptStatus(id));
  };
  const handlerRejectApplication = (id) => {
    dispatch(applicationsAction.addRejectStatus(id));
  };
  const handlerRemoveApplication = (id) => {
	dispatch(applicationsAction.removeApplication(id));
  }
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };
  let queryApplications

  if(query !== 'all') {
	  queryApplications = applications.filter((app) => app.status === query)
  } else {
	queryApplications = applications
  }

  return (
    <section className="flex flex-wrap gap-4 p-16">
      <select name="filter" className="w-24 h-8" onChange={queryHandler}>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="accept">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
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
    </section>
  );
};

export default Applications;
