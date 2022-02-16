import { useState } from "react";
import { Button, CloseButton, Form, InputGroup } from "react-bootstrap";
import { SEARCH_ICON } from "../store/types";

const SearchBar = ({ searchFilter }) => {
  const [query, setQuery] = useState("");

  const setQueryHandler = (event) => {
    setQuery(event.currentTarget.value);
  };

  const clearHandler = () => {
    setQuery("");
    searchFilter("");
  };

  return (
    <InputGroup className="mb-4 mx-auto align-items-stretch border">
      <Form.Control
        className="shadow-none border-0 "
        placeholder="Haku"
        value={query}
        onChange={setQueryHandler}
      />
      <div className="bg-white d-flex">
        <CloseButton
          onClick={clearHandler}
          className="my-auto px-3 shadow-none"
        />
      </div>
      <Button className="shadow-none border-start bg-whitesmoke" variant="light" onClick={() => searchFilter(query)}>
        <img src={SEARCH_ICON} height="28px" alt="Etsi"/>
      </Button>
    </InputGroup>
  );
};

export default SearchBar;