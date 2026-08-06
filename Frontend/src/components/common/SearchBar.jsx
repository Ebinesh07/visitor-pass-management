import { InputGroup, Form } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <InputGroup className="search-bar">

      <InputGroup.Text>

        <FaMagnifyingGlass />

      </InputGroup.Text>

      <Form.Control
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </InputGroup>
  );
};

export default SearchBar;