import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { userColumns } from '../../dataCharityTablesource';

const DataCharity = () => {
    const [dataCharities, setDataCharities] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
    useEffect(() => {
        axios.get("https://otrok.invoacdmy.com/api/dashboard/charity/index")
            .then(response => {
                setDataCharities(response.data.charities)
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
                        <Link to={`/charities/${params.row.id}`}  style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                       
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Show all charities
               
            </div>
            <DataGrid
                key={seed}
                className="datagrid"
                rows={dataCharities}
                columns={userColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
                <ToastContainer />
        </div>
    );
};
export default DataCharity