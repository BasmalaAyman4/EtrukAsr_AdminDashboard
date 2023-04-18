import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatypesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const DataCase = () => {
    const [data, setDataCases] = useState([]);
    useEffect(() => {
        axios.get("http://otrok.invoacdmy.com/api/dashboard/category/index")
            .then(response => {
                setDataCases(response.data.Categories)
            }
            ).catch((err) => { console.log(err) })
    }, [])
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Category
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    );
};

export default DataCase;
