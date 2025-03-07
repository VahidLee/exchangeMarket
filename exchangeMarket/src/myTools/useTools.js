import{ref,onMounted,onUnmounted} from 'vue'
export{useEventListener}

function useEventListener(target,event,callback){
    onMounted(()=>target.addEventListener(event,callback))
    onUnmounted(()=>target.removeEventListener(event,callback))
}