export const userColumns = [
    { field: "id", headerName: "ID", width: 40 },
    {
        field: "image",
        headerName: "Image",
        width: 70,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params?.row?.mazadimage[0]?.image} alt="avatar" />
            </div>
          );
        },
      },
    {
        field: "name_en",
        headerName: "Name En",
        width: 150,
    },
    {
        field: "name_ar",
        headerName: "Name Ar",
        width: 150,
    },

    {
        field: "current_price",
        headerName: "Current price",
        width: 120,
    }
    ,
    {
        field: "end_date",
        headerName: "End Date",
        width: 120,
    },
    {

        field: "end_time",
        headerName: "End Time",
        width: 100,
    },
   
    {
        field: "status",
        headerName: "Status",
        width: 100,
        renderCell: (params) => {
    
          return (
           
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      }

];
