import React from "react";
import PropTypes from "prop-types";
import { uniqueKey } from "../../utilities/uniqueKey";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect, textProperty, valueProperty } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={uniqueKey(item, valueProperty)}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: ["_id"],
};

ListGroup.propType = {
  items: PropTypes.array,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.array,
};
export default ListGroup;
