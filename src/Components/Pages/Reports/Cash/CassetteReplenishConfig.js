import { useEffect, useState } from "react";
import LoaderComp from "../../../Layout/Loader";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import {
  GetCassetteAverageConfigAPI,
  GetCassetteRepConfigAPI,
} from "../../../../services/CashReplenish/CashReplenish";
import { Logout } from "../../../../services/Auth";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbUserEdit } from "react-icons/tb";

export default function CassetteReplenishConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");

  const [CassetteRepConfig, SetCassetteRepConfig] = useState([]);
  const [CassetteRepConfigInput, SetCassetteRepConfigInput] = useState({
    Id: 0,
    BankId: 0,
    BankName: null,
    DeviceId: null,
    Cassette1: 0,
    Cassette2: 0,
    Cassette3: 0,
    Cassette4: 0,
    MaxAmountReplenish: 0,
    MaxReplenishCycleDays: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    GetCassetteRepConfigAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          //LogoutUser();
        }
        // console.log("MachineDetails response", response.data);
        SetCassetteRepConfig(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status != 200) {
          //LogoutUser();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const LogoutUser = () => {
    Logout();
  };
  const Transactioncolumns = [
    {
      name: "BankId",
      selector: (row) => row.BankId,
      options: {
        display: false,
      },
    },
    {
      name: "BankName",
      selector: (row) => row.BankName,
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "DeviceId",
      selector: (row) => row.DeviceId,
      sortable: true,
      filter: true,
    },

    {
      name: "Cassette1",
      selector: (row) => row.Cassette1,
      sortable: true,
      filter: true,
    },

    {
      name: "Cassette2",
      selector: (row) => row.Cassette2,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette3",
      selector: (row) => row.Cassette3,
      sortable: true,
      filter: true,
    },
    {
      name: "Cassette4",
      selector: (row) => row.Cassette4,
      sortable: true,
      filter: true,
    },
    {
      name: "MaxAmountReplenish",
      selector: (row) => row.MaxAmountReplenish,
      sortable: true,
      filter: true,
    },
    {
      name: "MaxReplenishCycleDays",
      selector: (row) => row.MaxReplenishCycleDays,
      sortable: true,
      filter: true,
    },
    {
      name: "Id",
      label: "Edit",
      selector: (row) => row.Id,
      sortable: true,
      filter: true,
      button: true,
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Popup
                trigger={
                  <div>
                    <div className="tooltip">
                      <TbUserEdit
                        className="DataTableIcons"
                        onClick={(row) => {
                          //   setTransactionDetails(null);
                          //   TransactionDetailsInput.TransactionId =
                          //     tableMeta.rowData[8];
                          //   GetTransactionsDetails();
                          CassetteRepConfigInput.Id = tableMeta.rowData[9];
                          CassetteRepConfigInput.BankId = tableMeta.rowData[0];
                          CassetteRepConfigInput.BankName =
                            tableMeta.rowData[2];
                          CassetteRepConfigInput.DeviceId =
                            tableMeta.rowData[2];
                          CassetteRepConfigInput.Cassette1 =
                            tableMeta.rowData[3];
                          CassetteRepConfigInput.Cassette2 =
                            tableMeta.rowData[4];
                          CassetteRepConfigInput.Cassette3 =
                            tableMeta.rowData[5];
                          CassetteRepConfigInput.Cassette4 =
                            tableMeta.rowData[6];
                          CassetteRepConfigInput.MaxAmountReplenish =
                            tableMeta.rowData[7];
                          CassetteRepConfigInput.MaxReplenishCycleDays =
                            tableMeta.rowData[8];

                          EditRepConfig(CassetteRepConfigInput);
                        }}
                      />
                      <span className="tooltiptext">Edit</span>
                    </div>
                  </div>
                }
                className="DashboardPopup"
                modal
                nested
              >
                {(close) => (
                  <div className="DashboardModal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div>
                      <EditRepConfig />
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          );
        },
      },
    },
  ];

  const EditRepConfig = (CassetteRepConfigInput) => {
    return (
      <div>
        <div className="EditPopup">
          <div className="row">
            <div className="Column">
              <label className="EditPopupLabel">Bank Name</label>
              <input
                className="FormControl_input"
                type="text"
                name="Bank Name"
                value={CassetteRepConfigInput.BankName}
                disabled
              />
            </div>
            <div className="Column">
              <label className="EditPopupLabel">Device Id</label>
              <input
                className="FormControl_input"
                type="text"
                name="Device Id"
                value={CassetteRepConfigInput.DeviceId}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="Column">
              <label className="EditPopupLabel">Cassette1</label>
              <input
                className="FormControl_input"
                type="text"
                name="Cassette1"
              />
            </div>
            <div className="Column">
              <label className="EditPopupLabel">Cassette2</label>
              <input
                className="FormControl_input"
                type="text"
                name="Cassette2"
              />
            </div>
          </div>
          <div className="row">
            <div className="Column">
              <label className="EditPopupLabel">Cassette3</label>
              <input
                className="FormControl_input"
                type="text"
                name="Cassette3"
              />
            </div>
            <div className="Column">
              <label className="EditPopupLabel">Cassette4</label>
              <input
                className="FormControl_input"
                type="text"
                name="Cassette4"
              />
            </div>
          </div>
          <div className="row">
            <div className="Column">
              <label className="EditPopupLabel">MaxAmountReplenish</label>
              <input
                className="FormControl_input"
                type="text"
                name="MaxAmountReplenish"
              />
            </div>
            <div className="Column">
              <label className="EditPopupLabel">MaxReplenishCycleDays</label>
              <input
                className="FormControl_input"
                type="text"
                name="Device Id"
              />
            </div>
            <div className="row">
              <input type="button" name="Update" Value="Update" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const options = {
    filter: true,
    filterType: "checkbox",
    download: true,
    selectableRowsHeader: true,
    sort: false,
    filterType: "dropdown",
    responsive: "vertical", // standard | vertical | simple
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    // selectableRowsOnClick: true,
    selectableRowsOnClick: false,
    print: true,
    viewColumns: true,
    searchOpen: false,
    search: true,
    //page: 0,
    // pageSize: 10,
    // rowsPerPage: 10,
    //rowsPerPageOptions: true,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    textLabels: {
      body: {
        noMatch: "",
        // noMatch: "Sorry, No Records Found",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "off",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        Particular: "Particular",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
  };

  const theme = createTheme({
    components: {
      MUIDataTable: {
        responsiveScroll: {
          minHeight: "580px",
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#2e3885",
            padding: "0px",
            fontSize: 10,
            color: "white",
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 10,
            color: "white",
            innerHeight: 40,
            padding: 10,
          },
          sortAction: {
            "& path": {
              color: "teal",
            },
          },
          sortActive: {
            color: "blue",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            // backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 10,
            //color: "#ffffff",
          },
        },
      },
      MuiTableFooter: {
        styleOverrides: {
          root: {
            // backgroundColor: "#9DA0B1",
            padding: "0px",
            fontSize: 12,
            //color: "#ffffff",
            padding: 0,
          },
        },
      },
    },
  });
  return (
    <div>
      <div>
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="DivDataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Cassette Configuration"}
                data={CassetteRepConfig}
                columns={Transactioncolumns}
                options={options}
                selectableRows
              />
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
