import React, { Component } from "react";
import { uniqueKey } from "../../utilities/uniqueKey";
import PropTypes from "prop-types";

class TableHeader extends Component {
  render() {
    const { columns, valueProperty } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={uniqueKey(column, valueProperty)}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  renderSortIcon(column) {
    const { sortColumn } = this.props;

    if (sortColumn.path !== column.path || !column.path) return null;
    else if (sortColumn.order === "asc")
      return <span className="fa fa-sort-asc"></span>;

    return <span className="fa fa-sort-desc"></span>;
  }

  raiseSort(path) {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else if (!path) {
      return null;
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  }
}

TableHeader.defaultProps = {
  valueProperty: ["label", "key"],
};

TableHeader.propTypes = {
  valueProperty: PropTypes.array,
};

export default TableHeader;
