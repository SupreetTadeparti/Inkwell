import { toast } from "react-toastify";

const notify = (msg) => {
  toast(msg, { position: "top-center" });
};

export { notify };
