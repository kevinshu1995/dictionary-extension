<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useLookupText } from "/lib/store/useLookupText";

const storeLookupText = useLookupText();

const definitions = computed(() => storeLookupText.definition.mainDefinitions);

const props = defineProps<{
    selectedWord: string | null;
    isPopupExpand: boolean;
}>();

watch(
    () => props.isPopupExpand,
    async () => {
        if (props.isPopupExpand) {
            getDefinitions();
        }
    }
);

watch(definitions, val => {
    console.log("mainDefinitions", val);
});

async function getDefinitions() {
    if (props.selectedWord === null) return;
    const { data } = await storeLookupText.getDefinitions(props.selectedWord);
    console.log({ data });
}
</script>

<template>
    <div
        class="-shadow-2xl -bg-white -text-left -divide-y -text-gray-600 -rounded-xl -border -border-gray-300 -w-[500px] -overflow-hidden"
    >
        <div class="-p-4 -space-y-2 -flex -justify-between -items-center">
            <h3 class="-font-bold -text-lg -text-gray-900">{{ props.selectedWord }}</h3>

            <div class=""></div>
        </div>

        <ul class="-max-h-[500px] -overflow-y-auto -p-4 -space-y-4">
            <li v-for="definition in definitions.data">
                <div>
                    <div class="">{{ definition.meta.id }}</div>
                    <div class="-italic -text-xs">{{ definition.fl }}</div>
                </div>

                <div class="-space-y-6">
                    <!-- <pre>{{ definition.def }}</pre> -->
                </div>

                <!-- cxs (popularised)-->
                <!-- <div>cxs</div> -->

                <div class="-space-y-6" v-for="def in definition.def">
                    <div v-if="def.vd">{{ def.vd }}</div>
                    <div v-for="sseq in def.sseq">
                        <div v-for="sseqItem in sseq">
                            <br />
                            <br />
                            ---{{ ["sense", "pseq", "bs", "sen"].includes(sseqItem[0]) }}
                            <!-- sense, pseq, bs -->
                            <div>{{ sseqItem[0] }}</div>
                            ---
                            <br />
                            <br />
                            <div>{{ sseqItem[1] }}</div>
                            <!-- 
                                sseqItem[0] === 'sense' 
                                ---
                                一定有 sseqItem[1].dt
                                options:  et, ins, lbs, prs, sdsense, sgram, sls, sn, vrs
                             -->

                            <!-- 
                                sseqItem[0] === 'pseq' 
                                ---
                                一定有 sseqItem[1] -> sense or bs array
                             -->

                            <!-- sn -->
                        </div>
                    </div>
                    <!-- <pre>{{ def.sseq }}</pre> -->
                </div>
            </li>
        </ul>
    </div>
</template>

