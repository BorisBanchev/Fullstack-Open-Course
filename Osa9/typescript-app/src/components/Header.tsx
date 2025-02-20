import type { Header } from "../types";

const Header = (props: Header) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

export default Header;
