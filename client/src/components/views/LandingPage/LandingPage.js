import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  // const onLogoutHandler = e => {
  //   Axios.get("/api/users/logout").then(res => {
  //     if (res.data.success) props.history.push("/login");
  //     else alert(res.data.message);
  //   });
  // };

  return (
    <div>
      LandingPage
      {/* <div>
        <button type="button" onClick={onLogoutHandler}>
          Log Out
        </button>
      </div> */}
    </div>
  );
}

export default withRouter(LandingPage);
