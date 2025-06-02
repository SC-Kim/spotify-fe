import React from "react";
import { useParams } from "react-router-dom";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();

  return <div>SearchWithKeywordPage: {keyword} </div>;
};

export default SearchWithKeywordPage;
