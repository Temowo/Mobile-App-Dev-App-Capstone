import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Subnavigation from "../../components/subnavigation/Subnavigation";
import Spinner from "../../components/ui/Spinner";
import order from "../../features/order";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
import NoOrderData from "../../components/no-data/NoOrderData";

const Orders = () => {
  const [item, setItem] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    order("getOrders")(page)
      .then((res) => {
        if (res) {
          //Filter new orders
          const data = res.data.data.orders.filter(
            (datum) => datum.status === "NEW"
          );
          setOrders(data);
          setLoading(false);
          // NotifySuccess(res.data.message);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAccept = (id) => {
    order("acceptOrder")(id)
      .then((res) => {
        if (res) {
          NotifySuccess(res.data.message);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  };

  const handleCancel = (id) => {
    order("cancelOrder")(orderId)
      .then((res) => {
        if (res) {
          NotifySuccess(res.data.message);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  };

  return (
    <div className="main-section orders-section">
      <div className="row-0">
        <Subnavigation />
      </div>

      <div className="flex justify-between">
        <div className="w-[60%]">
          {loading ? (
            <Spinner />
          ) : (
            <Card>
              {orders.length > 0 ? (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell align="left">Order Reference</TableCell>
                        <TableCell align="left">Order Date</TableCell>
                        <TableCell align="left">Transaction</TableCell>
                        <TableCell align="left">Delivery Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((row, i) => (
                        <TableRow
                          hover
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => {
                            setOrderId(row._id);
                            setOrderRef(row.order_reference);
                            setItem(row.items);
                            setIndex(i);
                          }}
                        >
                          <TableCell>{row.order_no}</TableCell>
                          <TableCell align="left" component="th" scope="row">
                            {row.order_reference}
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            {row.createdAt.split("T")[0]}
                          </TableCell>
                          <TableCell align="left">
                            {row.isPaid ? "Card" : "Cash"}
                          </TableCell>
                          <TableCell align="left">
                            <span className="w-[3rem] md:w-[6rem] text-center text-xs inline-block font-medium py-1 rounded-3xl bg-green-400">
                              {row.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <NoOrderData />
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

        <div className="row-2">
          {item && (
            <>
              <Card>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order Ref:</th>
                      <th>{orderRef}</th>
                    </tr>
                  </thead>
                </table>
              </Card>

              <div className="flex flex-col details">
                {/* {item.orders?.map((order, i) => (
                  <div key={i} className="flex justify-between">
                    <p>{item.name}</p>
                    <p>{order.price}</p>
                  </div>
                ))} */}

                {item.map((el, i) => (
                  <div key={i} className="flex justify-between">
                    <p>
                      {el.name} x {el.quantity}
                    </p>
                    <p>{item.amount}</p>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleCancel(orderId);
                    }}
                    className="button m-2 text-red-500 "
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => {
                      handleAccept(orderId);
                    }}
                    className="button m-2 p-4 flex items-center text-white bg-foodswipe-turquoise"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
