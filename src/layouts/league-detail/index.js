/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { TextField } from "@mui/material";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Data
import authorsTableData from "layouts/league-detail/data/authorsTableData";
import { useState } from "react";
import { BASE_URL } from "BASE_URL";
import axios from "axios";

const Leaguge = () => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // To store the category ID to be deleted

  const handleDelete = (categoryId) => {
    setOpenConfirmationDialog(true);
    setDeleteCategoryId(categoryId); // Set the category ID to be deleted
  };

  const handleConfirmStatusChange = async () => {
    const token = `Bearer ${localStorage.getItem("chemToken")}`;
    await axios.delete(
      `${BASE_URL}/api/subcategory/subcategories/${deleteCategoryId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setOpenConfirmationDialog(false);
    // Reset deleteCategoryId after deletion
    setDeleteCategoryId(null);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    // Reset deleteCategoryId if the user cancels the deletion
    setDeleteCategoryId(null);
  };
  const [league, setleague] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  // console.log(league)


  const handleCompanyChange = (event) => {
    setleague(event.target.value);
  }
  const handlestart = (event) => {
    setstart(event.target.value);
  }
  const handleend=(event)=>{
    setend(event.target.value);
  }

  const { columns, rows } = authorsTableData(league,start,end);

  const shouldShowAddButton = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return screenWidth < 850;
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="d-flex align-item-center gap-5 mt-5">
        <div className="name ">
            <TextField
              id="outlined-basic"
              label="Search league"
              variant="outlined"
              onChange={handleCompanyChange}
              value={league}
              style={{ width: "200px" }}
            />
        </div>
        <div className="name ">
            <TextField
              id="outlined-basic"
              label="Search Startdate"
              variant="outlined"
              onChange={handlestart}
              value={start}
              style={{ width: "200px" }}
            />
        </div>
        <div className="name ">
            <TextField
              id="outlined-basic"
              label="Search Enddate"
              variant="outlined"
              onChange={handleend}
              value={end}
              style={{ width: "200px" }}
            />
        </div>
      </div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  League List
                </MDTypography>
                <Link to="/add-league" style={{ textDecoration: "none" }}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    style={{ position: "absolute", top: "-9px", right: "2%" }}
                  >
                    {shouldShowAddButton() ? "" : "+ Add League"}
                  </MDButton>
                </Link>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Are You Sure Want To Delete?</DialogTitle>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <MDButton onClick={handleCloseConfirmationDialog} color="dark">
            No
          </MDButton>
          <MDButton onClick={handleConfirmStatusChange} color="info" autoFocus>
            Yes
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Leaguge;
