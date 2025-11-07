import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const successToast = async (response) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    await Toast.fire({
        icon: 'success',
        title: response.message
    })
}

export const errorToast = async (response) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    await Toast.fire({
        icon: 'error',
        title: response.message
    })
}

export const invalidFormSwal = async () => {
    await MySwal.fire({
        icon: "error",
        title: "Harap periksa kembali data anda!",
        showConfirmButton: false,
        timer: 1500,
    });
}