import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataType from "../../components/datatable/DataType"
import DataAcution from "../../components/datatable/DataAcution"
const ListAcution = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DataAcution />
            </div>
        </div>
    )
}

export default ListAcution