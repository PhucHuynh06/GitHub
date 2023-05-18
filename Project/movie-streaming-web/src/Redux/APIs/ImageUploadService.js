import toast from 'react-hot-toast';
import Axios from './Axios';


const uploadImageservice = async(file, setLoading) =>{
    try{
        setLoading(true);
        const {data} = await Axios.post("/upload", file);
        setLoading(false);
        toast.success("Đã Cật Nhật Thành Công !");
        return data;
    }catch(error){
        setLoading(false);
        toast.error("Đã Xảy ra sự cố!")
    }
};

export { uploadImageservice};