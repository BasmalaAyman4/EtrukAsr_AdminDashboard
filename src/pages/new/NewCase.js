import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"
const NewCase = () => {
  const [file, setFile] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    img: '',
    descriptionEn: '',
    descriptionAr: '',
    totalPrice: '',
    caseTypeId: '',
    donationTypeId: '',
    statusCase :''
  })
  useEffect(() => {
    axios.get(`https://otrok.invoacdmy.com/api/dashboard/category/index`)
      .then(response => {
        setDataCategories(response.data.Categories)
      }
      ).catch((err) => { console.log(err) })

    axios.get(`https://otrok.invoacdmy.com/api/dashboard/donationtype/index`)
      .then(response => {
        setDataType(response.data.Donationtypes)
        console.log(response)
      }
      ).catch((err) => { console.log(err) })

  }, [])
  const addFile = useRef(null)
  const addFileInput = useRef(null)
  const imageContentRef = useRef(null);
  const imageFirmRef = useRef(null);
  function handleLogo() {
    let inputFileEvent = document.querySelector(".input-file-js")
    inputFileEvent.click()
  }
  const [imageUrl, setImage] = useState(null)
  let previewUploadImage = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let preViewLink = URL.createObjectURL(file);
    setImage(preViewLink)
    setFormData(prevValue => {
      return {
        ...prevValue,
        'img': file
      }
    })
  }
  const onChangeHandler = e => {

    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData, "form")
    console.log(formData.paiedAmount)
  }
  const addNewCase = new FormData();
  addNewCase.append("name_ar", formData.titleAr);
  addNewCase.append("name_en", formData.titleEn);
  addNewCase.append("description_ar", formData.descriptionAr);
  addNewCase.append("description_en", formData.descriptionEn);
  addNewCase.append("initial_amount", formData.totalPrice);
  addNewCase.append("image", formData.img);
  addNewCase.append("donationtype_id", formData.donationTypeId);
  addNewCase.append("category_id", formData.caseTypeId);
  addNewCase.append("status", formData.statusCase);
  const onSubmitHandler = (e) => {
  
    const toastId = toast.loading("please wait ... ")
    setTimeout(() => { toast.dismiss(toastId); }, 1000);
    e.preventDefault()
    axios.post("https://otrok.invoacdmy.com/api/dashboard/case/store", addNewCase, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        toast.success(response.data.message)
        console.log(response)
      }
      ).catch((err) => { toast.error(err.response.data.message) })

  }
  return (

    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Case</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <input className={`fileImg  input-file-js`} ref={(e) => {
              addFileInput.current = e
            }} id="input-file" name="img" type="file" onChange={(e) => { previewUploadImage(e) }} />
            {
              imageUrl == null ?
                <>
                  <div ref={addFile} onClick={() => { handleLogo() }}>
                    <img className="img" ref={imageFirmRef} src={addImg} alt=" اضافه صورة للحاله" />
                  </div>
                </>
                :
                <div ref={addFile} onClick={() => { handleLogo() }}>
                  <img className="img" ref={imageContentRef} src={imageUrl} alt="" />
                </div>
            }
          </div>
          <div className="right">
            <form onSubmit={onSubmitHandler}>
  

              <div className="formInput" >
                <label>Name of Case in Arabic</label>
                <input
                  name="titleAr"
                  onChange={onChangeHandler}
                  value={formData.titleAr}
                />
              </div>

              <div className="formInput" >
                <label> Name of Case in English </label>
                <input
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="formInput" >
                <label> Description of case in Arabic </label>
                <input
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="formInput" >
                <label>Description of case in English</label>
                <input
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="formInput" >
                <label>Required Amount of Money</label>
                <input
                  name="totalPrice"
                  type='number'
                  onChange={onChangeHandler}
                  value={formData.totalPrice}
                />
              </div>
              <div className="formInput" >
                <select
                  className="input select"
                  name="caseTypeId"
                  onChange={onChangeHandler}
                  value={formData.caseTypeId}
                >
                  <option >Case Type</option>
                  {dataCategories && dataCategories.map(category =>
                    <option value={category.id} key={category.id}>{category.name_en}</option>
                  )}
                </select>
              </div>

              <div className="formInput" >
                <select
                  className="input select"
                  name="donationTypeId"
                  onChange={onChangeHandler}
                  value={formData.donationTypeId}
                >
                  <option > Donation Type</option>
                  {dataType && dataType.map(type =>
                    <option value={type.id} key={type.id} >{type.name_en}</option>
                  )}
                </select>
              </div>
              <div className="formInput" >
                  <select
                    className="input select"
                                    name="statusCase"
                                    onChange={onChangeHandler}
                    value={formData.statusCase}
                  >
                    <option  value=''> status</option>                
                    <option value='pending' >pending</option>
                    <option value='accepted'>accepted</option>
                    <option value='published'>published</option>
                    <option value='rejected'>rejected</option>
                   
                                    
                  </select>
                </div>
              <button type="submit">
                Send
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewCase;
