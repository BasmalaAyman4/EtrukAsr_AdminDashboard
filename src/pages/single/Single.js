import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useRef } from "react";
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"
import { useParams } from 'react-router-dom';
const Single = () => {
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
  })
  const casesId = useParams()
  const caseId = casesId.id
  useEffect(() => {
    axios.get(`http://otrok.invoacdmy.com/api/dashboard/category/index`)
      .then(response => {
        setDataCategories(response.data.Categories)
      }
      ).catch((err) => { console.log(err) })

    axios.get(`http://otrok.invoacdmy.com/api/dashboard/donationtype/index`)
      .then(response => {
        setDataType(response.data.Donationtypes)
        console.log(response)
      }
      ).catch((err) => { console.log(err) })

    axios.get(`http://otrok.invoacdmy.com/api/dashboard/case/show/${caseId}`)
      .then((response) => {
        setFormData({
          titleAr: response.data.case.name_ar,
          titleEn: response.data.case.name_en,
          img: response.data.case.image,
          descriptionEn: response.data.case.description_en,
          descriptionAr: response.data.case.description_ar,
          totalPrice: response.data.case.initial_amount,
          caseTypeId: response.data.case.category_id,
          donationTypeId: response.data.donationtype_id,
        })
        console.log(response, "show")
        console.log(formData, "gg")
      }).catch((err) => { console.log(err) })

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
  }
  const editCase = new FormData();
  editCase.append("name_ar", formData.titleAr);
  editCase.append("name_en", formData.titleEn);
  editCase.append("description_ar", formData.descriptionAr);
  editCase.append("description_en", formData.descriptionEn);
  editCase.append("initial_amount", formData.totalPrice);
  editCase.append("image", formData.img);
  editCase.append("donationtype_id", formData.donationTypeId);
  editCase.append("category_id", formData.caseTypeId);
  editCase.append("status", "published");
  const onSubmitHandler = (e) => {
    console.log(formData.donationTypeId)
    console.log(formData)
    const toastId = toast.loading("...انتظر قليلا")
    setTimeout(() => { toast.dismiss(toastId); }, 1000);
    e.preventDefault()
    axios.post(`http://otrok.invoacdmy.com/api/dashboard/case/update/${caseId}`, editCase, {
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
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top-case">
          <h1>Edit Case</h1>
        </div>
        <Form className="bottom-case" onSubmit={onSubmitHandler}>


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
                  {/* {errors.Logo && <span className="error-message ">{errors.Logo}</span>} */}
                </>
                :
                <div ref={addFile} onClick={() => { handleLogo() }}>
                  <img className="img" ref={imageContentRef} src={imageUrl} alt="" />
                </div>
            }
          </div>
          <div className="right">

            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Control name="titleAr" placeholder="    عنوان للحالة بالعربية" className="input" onChange={onChangeHandler} value={formData.titleAr} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Control name="titleEn" placeholder="    عنوان للحالة بالانجيزية" className="input" onChange={onChangeHandler} value={formData.titleEn} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Control as="textarea" rows="3" name="descriptionEn" placeholder="بالانجليزيه نبذة مختصرة عن الحالة" className="input" onChange={onChangeHandler} value={formData.descriptionEn} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Control as="textarea" rows="3" name="descriptionAr" placeholder=" عربي نبذة مختصرة عن الحالة" className="input" onChange={onChangeHandler} value={formData.descriptionAr} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <select
                placeholder="State"
                className="input select"
                name="caseTypeId"
                onChange={onChangeHandler}
                value={formData.caseTypeId}
              >
                <option >نوع الحالة</option>
                {dataCategories && dataCategories.map(category =>
                  <option value={category.id} key={category.id}>{category.name_en}</option>
                )}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <select
                placeholder="State"
                className="input select"
                name="donationTypeId"
                onChange={onChangeHandler}
                value={formData.donationTypeId}
              >
                <option > نوع التبرع</option>
                {dataType && dataType.map(type =>
                  <option value={type.id} key={type.id} >{type.name_en}</option>
                )}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Control name="totalPrice" type='number' placeholder=" المبلغ المراد تجميعة " className="input money" onChange={onChangeHandler} value={formData.totalPrice} />
            </Form.Group>
          </div>
          <Button type="submit" className="btn">
            اضافة الان
          </Button>

        </Form>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Single;
