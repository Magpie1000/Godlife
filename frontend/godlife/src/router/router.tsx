import { Navigate, useRoutes } from "react-router-dom";

import LandingLayout from "../layouts/LandingLayout";
import MainLayout from "../layouts/MainLayout";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import BingoCreate from "../pages/bingo/create/BingoCreate";
import BingoDetail from "../pages/bingo/detail/BingoDetail";
import BingoFeed from "../pages/bingo/feed/BingoFeed";
import BingoList from "../pages/bingo/list/BingoList";
import Join from "../pages/join/Join";
import Login from "../pages/login/Login";
import LoginOAuthKakao from "../pages/login/LoginOAuthKakao";
import Profile from "../pages/profile/Profile";
import ProfileFollowDetail from "../pages/profile/ProfileFollow/ProfileFollowDetail";
import SurveyInProgress from "../pages/survey/SurveyInProgress";
import SurveyResult from "../pages/survey/SurveyResult";
import SurveyStart from "../pages/survey/SurveyStart";
import { useAppSelector } from "../store/hooks";
import { selectTodayBingo } from "../store/todayBingo";

export default function Router() {
  const isAuth = localStorage.getItem("token");
  const code = useAppSelector(selectTodayBingo);

  return useRoutes([
    {
      path: "/join",
      element: isAuth ? <Navigate to="/" /> : <Join />,
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to="/" /> : <Login />,
    },
    {
      path: process.env.REACT_APP_KAKAO_REDIRECT_PATH,
      element: <LoginOAuthKakao />,
    },
    {
      path: "/survey",
      element: <MainLayout />,
      children: [
        {
          path: "/survey",
          element: <SurveyStart />,
        },
        {
          path: "/survey/inprogress",
          element: <SurveyInProgress />,
        },
        {
          path: "/survey/result",
          element: <SurveyResult />,
        },
      ],
    },
    {
      path: "/",
      element: isAuth ? <Navigate to="/create" /> : <LandingLayout />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/main",
          element: isAuth ? <Main /> : <BingoFeed />,
        },
        {
          path: "/bingo/:bingoId",
          element: <BingoDetail />,
        },
      ],
    },
    {
      path: "/",
      element: isAuth ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/create",
          element:
            code && code !== "none" ? (
              <Navigate to={`/bingo/${code}`} />
            ) : (
              <BingoCreate />
            ),
        },
        {
          path: "/list",
          element: <BingoList />,
          children: [
            {
              path: "/list",
              element: <BingoList />,
            },
            {
              path: "/list/:page",
              element: <BingoList />,
            },
          ],
        },
        {
          path: "/feed",
          element: <BingoFeed />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/:name",
          element: <ProfileFollowDetail />,
        },
      ],
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
}
