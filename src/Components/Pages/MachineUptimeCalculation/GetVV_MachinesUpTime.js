import { useEffect, useState } from "react";
import LoaderComp from "../../Layout/Loader";
import { GetLookupsAPI } from "../../../services/Lookups/Lookups_Api";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  ThemeProvider,
  CustomCheckbox,
} from "@mui/material/styles";
import {
  GetAllMachineDetailsAPI,
  GetVV_ParticularMachinesUpTimeAPI,
  GetVV_MachinesUpTimeAPI,
} from "../../../services/VynamicView/VynamicView";
import { Logout } from "../../../services/Auth";

import "../../../assets/styles/CustomStyles/FormControls.css";
import "../../../assets/styles/CustomStyles/Custom.css";

import { DatePicker } from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export default function GetVV_MachinesUpTime() {
  const [isLoading, setIsLoading] = useState(false);
  const Userdetails = localStorage.getItem("LoggedInUser");
  const [VV_ParticularMachinesUpTime, Set_VV_ParticularMachinesUpTime] =
    useState([]);

  const [MachineDetails, SetMachineDetails] = useState([]);

  const [AllTransactions, SetAllTransactions] = useState([]);
  //   {
  //   Dated: "",
  //   BankName: "",
  //   DeviceId: "",
  //   TerminalId: "",
  //   TotalMachineDownTimeSecs: "",
  //   TotalMachineDownTimeMins: "",
  //   TotalHoursFromGivenDate: "",
  //   TotalMachineDownTimeHrs: "",
  //   TotalHours_MachineUP: "",
  //   TotalMachineDownTime_Percentage: "",
  //   TotalMachineUpTime_Percentage: "",
  // }
  //);
  const [BankNameInput, setBankNameInput] = useState([]);
  const [ATM_TerminalIdInput, setATM_TerminalIdInput] = useState([]);
  const [MachinesUpTimeInput, setMachinesUpTimeInput] = useState({
    BankName: "",
    Atm_TerminalId: "",
    StartTime: "",
    EndTime: "",
    RequestDurationType: "day",
  });

  const date = new Date();
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const [TransactionStartDate, setTransactionStartDate] = useState(yesterday);
  const [TransactionEndDate, setTransactionEndDate] = useState(date);

  const [RadioButtonStatus, setRadioButtonStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const RadioButtonStatusHandler = (status) => {
    MachinesUpTimeInput.BankName = null;
    MachinesUpTimeInput.Atm_TerminalId = null;
    setRadioButtonStatus(status);
  };

  function fetchData() {
    setIsLoading(true);
    GetLookupsAPI(Userdetails)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        window.location = "ErrorPage_404";
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();

    GetAllMachineDetailsAPI(Userdetails)
      .then((response) => {
        if (response.status != "200") {
          //LogoutUser();
        }
        // console.log("MachineDetails response", response.data);
        setIsLoading(false);
        SetMachineDetails(response.data);

        const DistinctBankName = new Set(response.data.map((a) => a.BankName));

        setBankNameInput([...DistinctBankName]);
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

  function GetVV_MachinesUpTimeData() {
    setIsLoading(true);
    MachinesUpTimeInput.StartTime = TransactionStartDate.toLocaleDateString();
    MachinesUpTimeInput.EndTime = TransactionEndDate.toLocaleDateString();
    console.log("MachinesUpTimeInput", MachinesUpTimeInput);
    GetVV_MachinesUpTimeAPI(Userdetails, MachinesUpTimeInput)
      .then((response) => {
        // console.log(
        //   "Set_VV_ParticularMachinesUpTime response.data",
        //   response.data
        // );

        Set_VV_ParticularMachinesUpTime(response.data);

        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
      });
  }

  const handleInput = (event) => {
    setMachinesUpTimeInput({
      ...MachinesUpTimeInput,
      [event.target.name]: event.target.value,
    });

    setATM_TerminalIdInput([]);
    MachinesUpTimeInput.BankName = event.target.value;

    // if (event.target.name == "BankName")
    setBankNameInput.BankNameInput = event.target.value;

    const FilterTerminalId = MachineDetails.filter((c) =>
      c.BankName.includes(MachinesUpTimeInput.BankName)
    );

    const DistinctTerminalId = new Set(
      FilterTerminalId.sort().map((c) => c.TerminalId)
    );

    setATM_TerminalIdInput([...DistinctTerminalId]);
  };

  const handleATM_TerminalIdInput = (event) => {
    setATM_TerminalIdInput.ATM_TerminalIdInput = event.target.value;

    MachinesUpTimeInput.Atm_TerminalId = event.target.value;
  };

  const Transactioncolumns = [
    {
      name: "BankName",
      selector: (row) => row.BankName,
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "TerminalId",
      selector: (row) => row.TerminalId,
      sortable: true,
      filter: true,
    },

    {
      name: "TotalHoursFromGivenDate",
      selector: (row) => row.TotalHoursFromGivenDate,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalHours_MachineUP",
      selector: (row) => row.TotalHours_MachineUP,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalMachineDownTimeHrs",
      selector: (row) => row.TotalMachineDownTimeHrs,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalMachineDownTimeMins",
      selector: (row) => row.TotalMachineDownTimeMins,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalMachineDownTimeSecs",
      label: "TotalMachineDownTimeSecs",
      selector: (row) => row.TotalMachineDownTimeSecs,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalMachineDownTime_Percentage",
      label: "TotalMachineDownTime_Percentage",
      selector: (row) => row.TotalMachineDownTime_Percentage,
      sortable: true,
      filter: true,
    },
    {
      name: "TotalMachineUpTime_Percentage",
      label: "TotalMachineUpTime_Percentage",
      selector: (row) => row.TotalMachineUpTime_Percentage,
      sortable: true,
      filter: true,
    },
  ];

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
      <div className="DivContainer">
        <div className="row">
          <div className="ReportsColumn">
            <label className="LabelDashboardDropDown">
              <input
                className="RadioLabel"
                type="radio"
                name="release"
                checked={RadioButtonStatus === 1}
                value="All Bank"
                onClick={(e) => RadioButtonStatusHandler(1)}
              />
              All Machine
            </label>
          </div>
          <div className="ReportsColumn">
            <label className="LabelDashboardDropDown">
              <input
                className="RadioLabel"
                type="radio"
                name="release"
                checked={RadioButtonStatus === 2}
                onClick={(e) => RadioButtonStatusHandler(2)}
              />
              Particular Bank
            </label>
          </div>
          <div className="ReportsColumn">
            <label className="LabelDashboardDropDown">
              <input
                className="RadioLabel"
                type="radio"
                name="release"
                checked={RadioButtonStatus === 3}
                onClick={(e) => RadioButtonStatusHandler(3)}
              />
              Particular Machine
            </label>
          </div>
        </div>
        <div className="row">
          {RadioButtonStatus == 2 || RadioButtonStatus == 3 ? (
            <div className="ReportsColumn">
              <label className="LabelDashboardDropDown">Bank Name</label>
              <select
                onChange={handleInput}
                name="BankName"
                className="FormControl_Select"
              >
                <option value={"0"}>Select Bank</option>
                {BankNameInput.length > 0}?
                {BankNameInput.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
          ) : null}
          {RadioButtonStatus == 3 ? (
            <div className="ReportsColumn">
              <label className="LabelDashboardDropDown">ATM Terminal Id</label>
              <select
                onChange={handleATM_TerminalIdInput}
                name="ATM_TerminalId"
                className="FormControl_Select"
              >
                <option value={"0"}>Select Terminal Id</option>
                {ATM_TerminalIdInput.length > 0}?
                {ATM_TerminalIdInput.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                :null)
              </select>
            </div>
          ) : null}
          <div className="ReportsColumn">
            <label className="LabelDashboardDropDown">
              Transaction Start Date
            </label>

            <DatePicker
              name="TransactionStartDate"
              selected={TransactionStartDate}
              onChange={(TransactionStartDate) =>
                setTransactionStartDate(TransactionStartDate)
              }
              value={TransactionStartDate}
              format="dd-MM-yyyy"
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yy"
              maxDate={date}
            />
          </div>
          <div className="ReportsColumn">
            <label className="LabelDashboardDropDown">
              Transaction End Date
            </label>
            <DatePicker
              name="TransactionEndDate"
              selected={TransactionEndDate}
              onChange={setTransactionEndDate}
              value={TransactionEndDate}
              format="dd-MM-yyyy"
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yy"
              maxDate={date}
            />
          </div>
          <div className="Column">
            <div className="flex-buttons">
              <div>
                <input
                  className="btn-grad-reports"
                  type="button"
                  value="Filter"
                  onClick={GetVV_MachinesUpTimeData}
                />
              </div>
              <div>
                <input
                  className="btn-grad-reports"
                  type="button"
                  value="Reset"
                  //   onClick={ResetInputs}ResetInputs
                />
              </div>
            </div>
          </div>
          {/* <div className="">
            <DateTimePicker
              onChange={setTransactionStartDate}
              value={TransactionStartDate}
            ></DateTimePicker>
          </div> */}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <div className="DivDataTable">
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Machine UpTime"}
                data={VV_ParticularMachinesUpTime}
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
