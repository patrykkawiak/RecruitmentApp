import Button from "./UI/Button";
const Application = ({
  id,
  name,
  lastname,
  email,
  phone,
  city,
  job,
  vacancy,
  salary,
  resume,
  status,
  acceptHandler,
  rejectHandler,
  removeHandler,
}) => {
  return (
    <div key={id} className=" border-solid border-slate-600 border-2 p-4 h-max">
      <p>Name: {name}</p>
      <p>Last Name: {lastname}</p>
      <p className="flex gap-2">
        Email:{" "}
        <a
          className=" cursor-pointer"
          onClick={() => (window.location = `mailto:${email}`)}
        >
          {email}
        </a>
      </p>
      <p className="flex gap-2">
        Phone:{" "}
        <a
          className=" cursor-pointer"
          onClick={() => (window.location = `tel:${phone}`)}
        >
          {phone}
        </a>
      </p>
      <p>City: {city}</p>
      <p>Current Job: {job}</p>
      <p>Vacancy: {vacancy}</p>
      <p>Salary Requirement: {salary}</p>
      <p>Status: {status}</p>
      <Button>
        <a href={resume} download>
          Download {name}'s CV
        </a>
      </Button>
      <div className="flex gap-4">
        {status === "open" && (
          <>
            <Button clickFn={acceptHandler}>Accept</Button>{" "}
            <Button clickFn={rejectHandler}>Reject</Button>
          </>
        )}
		{status === 'rejected' && <Button clickFn={removeHandler}>Delete</Button>}
		{status === 'accept' && <Button>Send message</Button>}
      </div>
    </div>
  );
};

export default Application;
