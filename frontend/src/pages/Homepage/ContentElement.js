import React from "react";
import HomeNews from "./HomeNews";
import SearchBar from "../components/SearchBar";
import useGet from "./useGet";
const ContentElement = () => {
  const { data } = useGet([]);
  return (
    <div>
      <SearchBar data={data} />
      <HomeNews data={data} />
    </div>
  );
};

export default ContentElement;
