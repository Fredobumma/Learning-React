import { useParams } from "react-router-dom";

export function getParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
