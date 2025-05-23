import React from "react";
import TableRow from "@mui/material/TableRow";
import { InboxIcon } from "@heroicons/react/outline";
import { Table, TableCell, TableHead } from "@mui/material";

const NoTransactionData = () => {
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="right">Ref No.</TableCell>
            <TableCell align="right">Date Paid</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Status</TableCell>
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

export default NoTransactionData;
