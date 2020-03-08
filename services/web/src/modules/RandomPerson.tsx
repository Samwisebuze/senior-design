import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Link } from "gatsby";

interface Props extends RouteComponentProps {}

const RandomPerson: React.FC<Props> = () => {
  const [person, setPerson] = useState();
  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then(x => x.json())
      .then(x => setPerson(x));
  }, []);

  return (
    <div>
      <Link to="/app">Back to App</Link>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </div>
  );
};

export default RandomPerson;
