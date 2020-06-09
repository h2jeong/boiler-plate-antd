import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../_actions/user_actions";

export default function(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUser()).then(res => {
        const user = res.payload;
        // 1. 로그인한 상태
        // 관리자인 경우
        // 관리자가 아닌 경우
        // 2. 로그인 안한 상태
        // 로그인 유저 가능 페이지
        // 불가능 페이지
        if (user.isAuth) {
          if (adminRoute && !user.isAdmin) props.history.push("/");
          if (option === false) props.history.push("/");
        } else {
          if (option) props.history.push("/login");
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
