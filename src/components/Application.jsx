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
    <div
      key={id}
      className=" border-solid border-slate-300 border p-8 rounded-lg shadow-xl"
    >
      <div className="flex gap-16 items-center">
        <p className="text-3xl">
          {name} {lastname}
        </p>
        <p className="text-lg">{vacancy}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <a
          className=" cursor-pointer bg-slate-200 w-fit px-2 py-1 rounded-lg"
          onClick={() => (window.location = `mailto:${email}`)}
        >
          <i className='bx bx-envelope' ></i> {email}
        </a>
        <a
          className=" cursor-pointer bg-slate-200 w-fit px-2 py-1 rounded-lg"
          onClick={() => (window.location = `tel:${phone}`)}
        >
          <i className='bx bxs-phone' ></i> {phone}
        </a>
      </div>

      <div className="flex mt-4 gap-4">
        <p className="bg-slate-200 w-fit px-2 py-1 rounded-lg"> <i className='bx bx-current-location' ></i> {city}</p>
        <p className="bg-slate-200 w-fit px-2 py-1 rounded-lg"><i class='bx bxs-briefcase' ></i> {job}</p>

        <p className="bg-slate-200 w-fit px-2 py-1 rounded-lg"><i class='bx bx-credit-card' ></i> {salary}$</p>
      </div>
      <p className=" bg-black text-white w-fit px-2 py-1 rounded-lg mt-4">
        {status}
      </p>
      <div className="flex justify-end gap-4">
        <Button>
          <a href={resume} download>
            <i className="bx bxs-file-pdf"></i>
          </a>
        </Button>

        {status === "open" && (
          <>
            <Button clickFn={acceptHandler}>
              <i className="bx bx-check "></i>
            </Button>{" "}
            <Button clickFn={rejectHandler}>
              <i className="bx bx-x"></i>
            </Button>
          </>
        )}
        {status === "rejected" && <Button clickFn={removeHandler}>X</Button>}
        {status === "accept" && (
          <div className="flex gap-4">
            <Button><i className='bx bxl-telegram' ></i></Button>
            <Button clickFn={removeHandler}>X</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
