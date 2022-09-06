import React from "react";

interface Props {
  name: string;
}

const HomeScreen = ({ name }: Props) => {
  return name ? <h1>ELOOO {name}</h1> : <h1>Kim ty kurwa jestes?</h1>;
};

export default HomeScreen;
