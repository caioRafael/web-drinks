import { AxiosResponse } from "axios";
import { Categorys } from "../models/drinks";
import api from "./api";

export const getCategorys = async () => {
  try {
    const response: AxiosResponse<Categorys> = await api.get('list.php?c=list');
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

// export default { getCategorys }