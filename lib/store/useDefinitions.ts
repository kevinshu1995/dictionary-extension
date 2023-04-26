import { ref, computed } from "vue";
import { defineStore } from "pinia";
import dictionaryApi from "../api/merriamWebster";
// import type { Definitions } from "../api/merriamWebster/schema";

type PRS = {
    mw?: string;
    l?: string;
    l2?: string;
    pun?: string;
    sound?: {
        audio?: string;
        ref?: string;
        stat?: string;
    };
}[];

type PSL = string;
type SPL = string;
type HW = string;
type SGRAM = string;
type LBS = string[];
type SLS = string[];
type INS = {
    if?: string;
    ifc?: string;
    il?: string;
    prs?: PRS;
    spl?: SPL;
}[];

type VRS = {
    va: string;
    vl?: string;
    prs?: PRS;
    spl?: SPL;
}[];

type TEXT = ["text", string];

type BNW = [
    "bnw",
    {
        pname?: string;
        sname?: string;
        altname?: string;
        prs?: PRS; // ???????? DOC ????
    }
];
type CA = [
    "ca",
    {
        intro: string;
        cats: any[]; // ?????????? DOC ???
    }
];
type RI = ["ri", [(["riw", ...({ rie: string } | TEXT | VRS | PRS)[]] | TEXT)[]]]; // FIXME PRS???? wtf is this doc???????
type SNOTE = ["snote", (["t", string] | RI | VIS)[]];
type UNS = ["uns", [(TEXT | RI | VIS)[]]];
type AQ = {
    auth: string;
    source: string;
    aqdate: string;
    subsource?: {
        source: string;
        aqdate: string;
    };
};
type VIS = [
    "vis",
    [
        {
            t: string;
            aq?: AQ;
        }
    ]
];
type ET = (TEXT | ["et_snote", [["t", string]]])[];
type BS = ["bs", { sense: SENSE_DETAIL }];

type SEN =
    | (ET | INS | LBS | PRS | SGRAM | SLS | SN | VRS)[]
    | {
          et?: ET;
          ins?: INS;
          lbs?: LBS;
          prs?: PRS;
          sgram?: SGRAM;
          sls?: SLS;
          sn?: SN;
          vrs?: VRS;
      };
type SDSENSE = {
    sd: string;
    dt: DT;
    et?: ET;
    ins?: INS;
    lbs?: LBS;
    prs?: PRS;
    sgram?: SGRAM;
    sls?: SLS;
    vrs?: VRS;
};

type SN = string;

type SSEQ = (SENSE_ARRAY | BS | SEN | PSEQ)[];
type PSEQ = ["pseq", (["sense", SENSE_DETAIL] | BS)[]];

type DT = [TEXT, ...(BNW | CA | RI | SNOTE | UNS | VIS)[]];
type SENSE_DETAIL = {
    dt: DT;
    et?: ET;
    ins?: INS;
    lbs?: LBS;
    prs?: PRS;
    sdsense?: SDSENSE;
    sgram?: SGRAM;
    sls?: SLS;
    sn?: SN;
    vrs?: VRS;
};
type SENSE_ARRAY = ["sense", SENSE_DETAIL];
type SENSE = SENSE_DETAIL | SENSE_ARRAY;

type DEF = (VD_OBJ | SLS | SSEQ)[]; // SLS?

type VD = string;
type VD_OBJ = {
    vd: VD;
    sls?: SLS;
    sseq: SSEQ;
};

interface Definition {
    meta: {
        id: string;
        uuid: string;
        sort: string;
        src: string;
        section: string;
        stems: string[];
        offensive: boolean;
    };
    hom: number;
    hwi: {
        hw: HW;
        prs?: PRS;
    };
    ahws: {
        hw: HW;
        prs?: PRS;
        psl?: PSL;
    };
    vrs: VRS;
    fl: string;
    lbs: LBS;
    sls: SLS;
    ins: INS;
    cxs: {
        cxl?: string;
        cxtis?: {
            cxl?: string;
            cxr?: string;
            cxt?: string;
            cxn?: string;
        }[];
    }[];
    def: DEF;

    date: string;
    shortdef: string[];
    uros: {
        ure?: string;
        fl: string;
        utxt?: (VIS | UNS)[];
        ins?: INS;
        lbs?: LBS;
        prs?: PRS;
        psl?: PSL;
        sls?: SLS;
        vrs?: VRS;
    }[];
    dros: {
        drp?: string;
        def: DEF;
        et?: ET;
        lbs?: LBS;
        prs?: PRS;
        psl?: PSL;
        sls?: SLS;
        vrs?: VRS;
    }[];
    dxnls: string[];
    usages: { pl?: string; pt?: (TEXT | VIS | { uarefs: { uaref: string } })[] }[]; // uarefs???
    syns: { pl?: string; pt?: (TEXT | VIS)[]; sarefs: string[] }[]; // sarefs ??? DOC ???
    quotes: { t: string; aq: AQ }[];
    art?: {
        artid: string;
        capt: string;
    };
    table?: {
        tableid: string;
        displayname: string;
    };
    et?: ET;
}

type ApiDefinitions = Partial<Definition>[];
type PromiseResponse = Promise<{ data: any; error: any; [key: string]: any }>;

export const useDefinitions = defineStore("definitions", () => {
    const currWord = ref<string | null>(null); // scoped here, don't expose
    // TODO rename to apiCurrDefinitions
    const currDefinitions = ref<ApiDefinitions | null>(null);

    // null  -> 沒有資料
    // false -> 找不到資料
    // true  -> 有資料
    const mainDefinitions = computed<{
        data: ApiDefinitions | null;
        suggestion: ApiDefinitions | null;
        word?: string;
    }>(() => {
        if (currDefinitions.value === null || currWord.value === null)
            return {
                data: null,
                suggestion: null,
            };

        if (Array.isArray(currDefinitions.value) === false)
            return {
                data: null,
                suggestion: null,
            };

        if (typeof currDefinitions.value[0] === "string") {
            // 代表找不到結果
            return {
                data: null,
                suggestion: currDefinitions.value,
            };
        }

        return {
            data: currDefinitions.value.filter(item => item.meta.stems.includes(currWord.value)),
            suggestion: null,
            word: currWord.value,
        };
    });

    async function getDefinitions(word: string): PromiseResponse {
        if (currWord.value === word) return { data: currDefinitions.value, error: null };

        const response = await dictionaryApi.getCollegiate(word);

        if (response.error) {
            reset();
            // Error handler
            return response;
        }

        currDefinitions.value = response.data;
        currWord.value = word;
        return response;
    }

    function reset() {
        currWord.value = null;
        currDefinitions.value = null;
    }

    return {
        currDefinitions,
        mainDefinitions,

        getDefinitions,
        reset,
    };
});

