import { computed } from 'vue'

export function useBirthday() {
    const BIRTHDAY = new Date('2004-9-21')

    const daysUntilBirthday = computed(() => {
        const today = new Date()
        const nextBirthday = new Date(today.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate())
        if (today > nextBirthday) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
        }
        return Math.floor((nextBirthday.getTime() - today.getTime()) / 86400000)
    })

    const daysSinceBorn = computed(() => {
        return Math.floor((new Date().getTime() - BIRTHDAY.getTime()) / 86400000)
    })

    const currentAge = computed(() => {
        const today = new Date()
        let age = today.getFullYear() - BIRTHDAY.getFullYear()
        const monthDiff = today.getMonth() - BIRTHDAY.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BIRTHDAY.getDate())) {
            age--
        }
        return age
    })

    return {
        daysUntilBirthday,
        daysSinceBorn,
        currentAge,
    }
}
