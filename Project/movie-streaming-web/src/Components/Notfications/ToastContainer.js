import {
    Toaster
} from "react-hot-toast";

export default function ToastContainer(){
    return(
        <Toaster
            position="bottom-left"
            reverse0rder={false}
            gutter={8}
            toastOptions={{
                duration: 2000,
            }}
        />
    );
}
