import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataAcutionTablesource';

const DataEvent = () => {
    const [data, setData] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    }

    useEffect(() => {
        axios.get("https://otrok.invoacdmy.com/api/dashboard/mazad/index",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenA')}`,
                "Content-Type": "multipart/form-data"
      
            }
        })
            .then(response => {
                console.log(response.data.auctions)
                setData(response.data.auctions)

            }
            ).catch((err) => { console.log(err) })
        reset()
    }, [])
    function handleDelete(id) {

        axios.post(`https://otrok.invoacdmy.com/api/dashboard/mazad/destroy/${id}`,'',{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenA')}`,
                "Content-Type": "multipart/form-data"
      
            }
        })
            .then(response => {
                toast.success(response.data.message)
                console.log(response)
            }
            ).catch((err) => { toast.error(err) })
        reset()
    }
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {

                return (
                    <div className="cellAction">
                        <button
                            onClick={(e) => { handleDelete(params.row.id) }}
                            className="deleteButton"
                        >
                            Delete
                        </button>
                        <Link to={`/editAcution/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="updateButton">Update</div>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                All Acutions
               
            </div>
            <DataGrid
                key={seed}
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
            <ToastContainer />
        </div>
    );
}

export default DataEvent