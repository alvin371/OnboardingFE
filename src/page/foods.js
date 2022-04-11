import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query'
import Modals from './productModals'


const getAPI = async () => {
    const res = await axios.get(`https://staging.javaagroglobalindo.com/highlights`, {
        withCredentials: false,
    }).catch((err) => {
        console.log("fetching api error", err);
    })
    console.log("ini data api", res.json());
    return res
}

const Foods = () => {
    const { data, status, err } = useQuery('higlights', getAPI)
    console.log(data, status, err);
    const [modal, setModal] = useState(false)
    const [tempData, setTempData] = useState([])
    const getData = (img, title, desc) => {
        let tempData = [img, title, desc]
        setTempData(item => [1, ...tempData])
        return setModal(true)
    }
    return (
        <>
            <Navbar />
            {/* Breadcrumb */}
            <div className="flex mx-auto justify-center">
                <div className="flex items-center py-4 overflow-y-auto whitespace-nowrap">
                    <a href="#" className="text-gray-600 dark:text-gray-200">
                        Home
                    </a>

                    <span className="mx-5 text-gray-500 dark:text-gray-300">
                        /
                    </span>

                    <a href="#" className="text-gray-600 dark:text-gray-200 hover:underline">
                        Foods
                    </a>
                </div>

            </div>
            <div className="flex mx-auto justify-center mb-16">
                <h1 className="text-7xl font-black text-gray-600">List Of Planet</h1>
            </div>

            {/* Content */}
            <div className="flex flex-wrap mx-auto justify-center">
                {status == 'loading' && (
                    <div>Loading Data</div>
                )}
                {status == 'error' && (
                    <div>Error Fetching Data</div>
                )}
                {status == 'success' && (


                    data.data.data.map(value => (
                        <a className="block overflow-hidden border border-gray-100 rounded-lg shadow-sm mx-4 basis-1/4" key={value.key}>
                            <img className="object-cover w-full h-56" src={value.image} alt="" />
                            <div className="p-6">
                                <h5 className="text-xl font-bold">
                                    {value.title_id}
                                </h5>
                                <p className="mt-2 text-sm text-gray-500">
                                    {value.description_id}
                                </p>
                                <div className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500" onClick={() => getData(value.image, value.title_id, value.description_id)}>
                                    <button >
                                        <a>Lihat Detail Products</a>
                                    </button>
                                    <Modals open={modal} onClose={() => setModal(false)} img={tempData[1]} title={tempData[2]} desc={tempData[3]} >
                                        {value.id}
                                    </Modals>
                                    <span aria-hidden="true">&rarr;</span>
                                </div>
                            </div>
                        </a>
                    ))

                )}
            </div>
            <Footer />
        </>
    );
}

export default Foods;