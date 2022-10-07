import React, { Component } from "react";
import _ from "lodash";
import { uniqueKey } from "../../utilities/uniqueKey";
import PropTypes from "prop-types";

class TableBody extends Component {
  render() {
    const { data, columns, valueProperty } = this.props;

    return (
      <tbody>
        {data.map((dataItem) => (
          <tr key={uniqueKey(dataItem, valueProperty)}>
            {columns.map((column) => (
              <td key={uniqueKey(column, valueProperty)}>
                {this.renderCell(dataItem, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderCell(dataItem, column) {
    if (column.content) return column.content(dataItem);

    return _.get(dataItem, column.path);
  }
}

TableBody.defaultProps = {
  valueProperty: ["_id", "label", "key"],
};

TableBody.propTypes = {
  valueProperty: PropTypes.array,
};

export default TableBody;
