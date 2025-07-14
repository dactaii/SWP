import Swal from "sweetalert2";

const CustomSwal = Swal.mixin({
  customClass: {
    popup: "custom-swal-popup",
    title: "custom-swal-title",
    confirmButton: "custom-swal-confirm-btn",
    cancelButton: "custom-swal-cancel-btn",
  },
  buttonsStyling: false,
});

export default CustomSwal;
