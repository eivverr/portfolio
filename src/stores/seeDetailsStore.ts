import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSeeDetailsStore = defineStore('seeDetails', () => {
    const showDetails = ref<boolean>(false)

    function setShowDetails(value: boolean) {
        showDetails.value = value
    }

    return {
        showDetails,
        setShowDetails,
    }
})
