import TimelinePage from "../pages/Timeline/TimelinePage";
import HomePage from "../pages/Homepage/ContentElement";
import { RouteConfig } from "react-router-config";
import "react-router-dom";
import newsPage from "../pages/News/newsPage";
import ResultPage from "../pages/ResultPage/ResultPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import errorPage from "../pages/components/ErrorPage";

const routes: RouteConfig = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/search/:searchWord",
    component: SearchPage,
    exact: true,
  },
  {
    path: "/category/:category",
    component: ResultPage,
    exact: true,
  },
  {
    path: "/timeline/:timelineId",
    component: TimelinePage,
    exact: true,
  },
  {
    path: "/timeline/:timelineId/event/:eventId",
    component: newsPage,
    exact: true,
  },
  {
    path: "*",
    component: errorPage,
  },
];

export default routes;
