import React from "react";
import { Link } from "gatsby";

import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <div>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <h1>
      Click to go to app -&gt; <Link to="/app/">Login</Link>
    </h1>
  </div>
);

export default IndexPage;
