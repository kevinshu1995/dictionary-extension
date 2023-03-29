import axios from "axios";
import Interceptors from "./interceptors";

export const wordnikAxios = new Interceptors.Interceptors(
    axios.create({
        baseURL: "/wordnik/v4",
    })
)
    .apply(Interceptors.PrintLog)
    .apply(Interceptors.Wordnik).axios;

