import React from "react";
import TableRow from "@mui/material/TableRow";
import { InboxIcon } from "@heroicons/react/outline";
import { Table, TableCell, TableHead } from "@mui/material";

const NoMenuData = () => {
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Meal type</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <div className=" flex flex-col items-center justify-center my-5">
        <InboxIcon className="h-10 w-10 text-gray-400" />
        <p className="text-gray-400">No Data</p>
      </div>
    </>
  );
};

export default NoMenuData;
