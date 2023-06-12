
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataVolunteerTablesource';



const DataVolunteer = () => {
    const [token ,setToken] = useState(localStorage.getItem('token'))
    const [data, setData] = useState([]);

    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
     
    useEffect(() => {
      axios.get("https://otrok.invoacdmy.com/api/dashboard/volunteer/index",{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('tokenA')}`,
            "Content-Type": "multipart/form-data"
  
        }
    })
        .then(response => {
          setData(response.data.volunteers)

        }
        ).catch((err) => { console.log(err) })
        reset()
    }, [])
    function handleDelete(id) {
  
      axios.post(`https://otrok.invoacdmy.com/api/dashboard/volunteer/destroy/${id}`,'',{
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
              <Link to={`/volunteer/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <button
                  onClick={(e)=>{handleDelete(params.row.id)}}
                  className="deleteButton"
              >
                Delete
              </button>
             
           
              
         
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
        <div className="datatableTitle">
           All volunteers
         
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
  )
}

export default DataVolunteer;