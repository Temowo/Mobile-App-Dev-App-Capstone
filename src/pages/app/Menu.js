import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
import Card from "../../components/ui/Card";
import NoMenuData from "../../components/no-data/NoMenuData";
import { EllipseIcon } from "../../assets";
import Spinner from "../../components/ui/Spinner";
import menu from "../../features/menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NotifyError } from "../../components/toast/toast";
import AddItemModal from "../../components/modal/AddItemModal";
import EditItemModal from "../../components/modal/EditItemModal";
import DeleteItemModal from "../../components/modal/DeleteItemModal";

const MenuPage = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editModalLoading, setEditModalLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [menus, setMenus] = useState([]);
  const [itemId, setItemId] = useState(null);
  const handleEditClick = (itemId) => setItemId(itemId);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getMenu = (pageNo) => {
    menu("getMenuItems")(pageNo).then((res) => {
      if (res) {
        setMenus(res.data.data.menus);
        setLoading(false);
      }
    });
  };

  const addItem = (payload) => {
    setModalLoading(true);
    menu("addItem", payload)()
      .then((res) => {
        if (res) {
          setModalLoading(false);
          handleClose();
          getMenu(page);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
        setModalLoading(false);
      });
  };

  const editItem = (payload) => {
    menu(
      "editMenuItem",
      payload
    )(itemId)
      .then((res) => {
        if (res) {
          setEditModalLoading(false);
          handleCloseEdit();
          getMenu(page);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
        setEditModalLoading(false);
      });
  };

  const deleteItem = () => {
    menu("deleteMenuItem")(itemId)
      .then((res) => {
        if (res) {
          handleCloseDelete();
          getMenu(page);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMenu(page);
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="main-section orders-section">
      <div className="row-2 flex justify-end">
        <button
          className="mt-5 font-medium bg-slate-100 w-32 h-10 rounded-md text-foodswipe-turquoise"
          onClick={handleOpen}
        >
          Add item
        </button>
      </div>

      <div className="my-5">
        {loading ? (
          <Spinner />
        ) : (
          <Card>
            {menus.length > 0 ? (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Meal type</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Image</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menus.map((row, i) => (
                      <TableRow
                        hover
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        //   onClick={() => { }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.mealType}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">
                          <div className="flex justify-end">
                            <img className="w-10 h-5" src={row.imagePath} />
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex justify-end">
                            <EllipseIcon
                              onClick={(event) => {
                                handleClickMenu(event);
                                handleEditClick(row._id);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoMenuData />
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

        <AddItemModal
          open={open}
          close={handleClose}
          loading={modalLoading}
          onAdd={addItem}
        />

        <EditItemModal
          open={openEdit}
          close={handleCloseEdit}
          loading={editModalLoading}
          onEdit={editItem}
        />

        <DeleteItemModal
          open={openDelete}
          close={handleCloseDelete}
          onDelete={deleteItem}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpenEdit}>Edit</MenuItem>
          <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MenuPage;
