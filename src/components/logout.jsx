import { Component } from "react";
import { getHooks } from "../utilities/getHooks";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    this.props.navigate("/");
  }

  render() {
    return null;
  }
}

export default getHooks(Logout);
