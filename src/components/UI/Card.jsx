const Card = ({ children }) => {
  return (
    <div
      className=" h-48 w-80 bg-transparent border border-slate-200 rounded-lg shadow-lg hover:-translate-y-2   duration-300
    "
    >
      {children}
    </div>
  );
};

export default Card;
