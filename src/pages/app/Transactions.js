import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
import payment from "../../features/payment";
import { NotifyError } from "../../components/toast/toast";
import NoTransactionData from "../../components/no-data/NoTransaction";

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    payment("getTransactions")(page)
      .then((res) => {
        if (res) {
          setTransations(res.data.data.transactions);
          setLoading(false);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="main-section transaction-section">
      <div className="">
        {loading ? (
          <Spinner />
        ) : (
          <Card>
            {transactions.length > 0 ? (
              <TableContainer>
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
                  <TableBody>
                    {transactions.map((row, i) => (
                      <TableRow
                        hover
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="right">{row.reference}</TableCell>
                        <TableCell align="right">{row.createdAt}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        {/* {row.status ? (
                          <TableCell align="right">
                            <span className="w-[3rem] md:w-[6rem] text-center text-xs inline-block font-medium py-1 rounded-3xl bg-green-400">
                              Success
                            </span>
                          </TableCell>
                        ) : (
                          <TableCell align="right">
                            <span className="w-[3rem] md:w-[6rem] text-center text-xs inline-block font-medium py-1 rounded-3xl bg-red-500">
                              Failed
                            </span>
                          </TableCell>
                        )} */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoTransactionData />
            )}

            <div className="flex justify-end">
              <Pagination
                onChange={handlePageChange}
                page={page}
                count={10}
                shape="rounded"
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Transactions;
