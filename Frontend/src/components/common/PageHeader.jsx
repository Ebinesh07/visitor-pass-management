import { Button } from "react-bootstrap";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onClick,
}) => {
  return (
    <div className="page-header-custom">

      <div>

        <h2>{title}</h2>

        {subtitle && (
          <p>{subtitle}</p>
        )}

      </div>

      {buttonText && (
        <Button
          onClick={onClick}
          className="header-btn"
        >
          {buttonIcon}

          <span>{buttonText}</span>

        </Button>
      )}

    </div>
  );
};

export default PageHeader;