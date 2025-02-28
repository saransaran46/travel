import Userscreen from "../mainscreen/userscreen";
import Adminuser from "./adminscreen";
const mainscreen = () => {
  if (localStorage.getItem("is_admin") === 'true') {
    return <div className="mainscreen"><Adminuser /></div>;
  } else {
    return (
      <div className="mainscreen">
        <Userscreen />
      </div>
    );
  }
};
export default mainscreen;
