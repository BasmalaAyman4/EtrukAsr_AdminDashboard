import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
const Single = () => {
  const [formData, setFormData] = useState([])

  const casesId = useParams()
  const caseShowId = casesId.userId

  useEffect(() => {
    axios.get(`http://otrok.invoacdmy.com/api/dashboard/case/show/3`)
      .then((response) => {
        setFormData(response.data.case)
      }).catch((err) => { console.log(err) })

  }, [])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={formData.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <span className="itemKey">Name: </span>
                <span className="itemValue"> {formData.name_en}</span>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{formData.description_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total price:</span>
                  <span className="itemValue">{formData.initial_amount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{formData.status}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;