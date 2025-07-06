import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
    const canChangeRoute = ref(true)

    const setCanChangeRoute = (value: boolean) => {
        canChangeRoute.value = value
    }

    return {
        canChangeRoute,
        setCanChangeRoute,
    }
})
