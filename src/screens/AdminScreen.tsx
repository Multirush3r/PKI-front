import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

// export type User = {
//   id: number;
//   email: string;
//   roles: Array<string>;
//   name: string;
//   surname: string;
//   verified: boolean;
// };

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nick",
    width: 250,
  },
  {
    field: "verified",
    headerName: "Is Verified?",
    width: 250,
  },
];

function AdminScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:8080/api/users/all", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        width: "50%",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        rowHeight={50}
      />
    </Box>
  );
}

export default AdminScreen;
