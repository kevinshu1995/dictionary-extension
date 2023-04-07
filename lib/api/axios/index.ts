import axios from "axios";
import Interceptors from "./interceptors";

export const wordnikAxios = new Interceptors.Interceptors(
    axios.create({
        baseURL: "/wordnik/v4/word.json",
    })
)
    .apply(Interceptors.PrintLog)
    .apply(Interceptors.Wordnik).axios;

export const merriamWebsterThesaurusAxios = new Interceptors.Interceptors(
    axios.create({
        baseURL: "/dictionaryapi/api/v3/references/thesaurus/json",
    })
)
    .apply(Interceptors.PrintLog)
    .apply(Interceptors.Thesaurus).axios;

export const merriamWebsterCollegiate = new Interceptors.Interceptors(
    axios.create({
        baseURL: "/dictionaryapi/api/v3/references/collegiate/json",
    })
)
    .apply(Interceptors.PrintLog)
    .apply(Interceptors.Collegiate).axios;

