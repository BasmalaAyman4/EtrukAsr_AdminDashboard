export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.caseimage[0]?.image} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "name_en",
    headerName: "Name En",
    width: 130,
  },


  {
    field: "initial_amount",
    headerName: "Required Amount ",
    width:150,
  },
  {
    field: "user",
    headerName: "User Email",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="">
            {params?.row?.user.email}
        </div>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {

      return (
       
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
