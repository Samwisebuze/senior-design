import React from "react";
import { Link } from "gatsby";

import SEO from "../components/seo";
import BaseLayout from "../components/BaseLayout";

const IndexPage = () => {
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
