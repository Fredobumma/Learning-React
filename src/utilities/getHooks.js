import { useParams, useNavigate, useLocation } from "react-router-dom";

export function getHooks(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      location={useLocation()}
    />
  );
}
