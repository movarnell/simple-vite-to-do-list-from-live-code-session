import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { parseISO, format } from "date-fns";

const List = ({ items, deleteItem }) => {
  // Function to render each item
  const renderItem = (item, index) => (
    <div key={index} className="col-md-3 col-sm-12 m-2 p-2">
      <h3>{item.title}</h3>
      <p className="text-muted small-dates">
        {format(item.createdAt, "d-M-yy h:mm a")}
      </p>
      <p>{item.notes}</p>

      <p
        data-testid="over-due-element"
        className={
          parseISO(item.dueDate) < new Date()
            ? "small-dates red"
            : "small-dates"
        }
      >
        {parseISO(item.dueDate) < new Date() ? "Over" : ""} Due:{" "}
        {format(item.dueDate, "d-M-yy h:mm a")}
      </p>
      <Button variant="danger" onClick={() => deleteItem(item.id)}>
        Delete
      </Button>
    </div>
  );

  return (
    <div className="row mx-auto">

        {items.length === 0 ? <p className="text-center"><strong>No Items</strong></p> : items.map(renderItem)}

    </div>
  );
};
export default List;

List.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
