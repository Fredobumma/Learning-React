import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`clickable fa fa-heart${!liked ? "-o" : ""}`}
      aria-hidden="true"
    ></span>
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
