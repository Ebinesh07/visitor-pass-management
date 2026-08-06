import { FaInbox } from "react-icons/fa6";

const EmptyState = ({
  title = "No Data Found",
  description = "Nothing to display."
}) => {
  return (
    <div className="empty-state">

      <FaInbox className="empty-icon" />

      <h4>{title}</h4>

      <p>{description}</p>

    </div>
  );
};

export default EmptyState;