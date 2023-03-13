import { isUndefined } from "lodash";
import { leaderBoardType, raceType } from "./coh3/coh3-types";

const getLeaderBoardRoute = (race?: raceType, type?: leaderBoardType, start?: number) => {
  const searchParams = new URLSearchParams(
    Object.assign(
      {},
      !isUndefined(race) && { race },
      !isUndefined(type) && { type },
      !isUndefined(start) && { start },
    ) as any,
  );
  let searchParamString = searchParams.toString();
  if (searchParamString.length > 0) {
    searchParamString = "?" + searchParamString;
  }
  return encodeURI(`/leaderboards${searchParamString}`);
};

const getExplorerFactionRoute = (race: raceType) => {
  return encodeURI(`/explorer/races/${race}`);
};

const getDPSCalculatorRoute = () => {
  return encodeURI(`/explorer/dps`);
};

const getDesktopAppRoute = () => {
  return encodeURI(`/desktop-app`);
};

const getAboutRoute = () => {
  return encodeURI(`/about`);
};

export {
  getLeaderBoardRoute,
  getExplorerFactionRoute,
  getDPSCalculatorRoute,
  getDesktopAppRoute,
  getAboutRoute,
};
