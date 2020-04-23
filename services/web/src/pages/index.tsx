import React from "react";
import { Link, navigate } from "gatsby";

import SEO from "../components/seo";
import BaseLayout from "../components/BaseLayout";
import { isLoggedIn } from "../util/auth";

const IndexPage = () => {
  if (isLoggedIn()) {
    navigate(`/app`);
  } else {
    navigate(`/login`);
  }

  return (
    <BaseLayout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to Virtuoso!</p>
      <h1>
        <Link to="/app/">Go To App</Link>
      </h1>
    </BaseLayout>
  );
};

export default IndexPage;
