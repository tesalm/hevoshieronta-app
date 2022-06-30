import { useState, memo } from "react";
import { Button, Form } from "react-bootstrap";

const SearchTreatmentsByDate = ({ fetchByDate }) => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1, 4).toISOString().split("T")[0], 
    end: new Date().toISOString().split("T")[0]
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const {start, end} = event.target;
    setDateRange({ start: start.value, end: end.value });
    fetchByDate(start.value, end.value);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="d-flex mb-1">
        <Form.Control
          required
          type="date"
          name="start"
          defaultValue={dateRange.start}
          className="flex-grow-1 rounded-0"
        />
        <p className="pb-2 px-1 my-auto">__</p>
        <Form.Control
          required
          type="date"
          name="end"
          defaultValue={dateRange.end}
          className="flex-grow-1 rounded-0"
        />
        <Button className="ms-1 rounded-0" type="submit">
          Hae
        </Button>
      </div>
    </Form>
  );
};

export default memo(SearchTreatmentsByDate);
