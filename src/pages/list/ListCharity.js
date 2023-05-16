import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataCategory from "../../components/datatable/DataCategory"
import DataCharity from "../../components/datatable/DataCharity"
const ListCharity = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DataCharity />
            </div>
        </div>
    )
}

export default ListCharity