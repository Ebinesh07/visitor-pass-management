import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      className="loader-container"
    >
      <Spinner
        animation="border"
        variant="primary"
      />

      <p>{text}</p>

    </div>
  );
};

export default Loader;