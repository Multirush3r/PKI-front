import { Box } from "@mui/material";
import { SyntheticEvent } from "react";
import { Button } from "react-bootstrap";

interface Props {
  params: any;
}

const UsersActions = ({ params }: Props) => {
  const verifyHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(JSON.stringify({ id: params.row.id }));
    console.log(
      JSON.stringify({
        Authorization: "Bearer " + localStorage.jwt,
      })
    );

    //interact with a backend using fetch
    const response = await fetch(
      "http://localhost:8080/api/users/activate/" + params.row.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
      }
    );

    if (response.ok) {
      console.log("Auth: ok");
      window.location.reload();
    } else {
      console.log("Auth: nieok");
    }
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Button
        disabled={params.row.verified ? true : false}
        onClick={verifyHandler}
      >
        Verify
      </Button>
    </Box>
  );
};

export default UsersActions;
