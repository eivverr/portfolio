export {}

declare global {
    interface Tool {
        name: string
        description: string
        masteryLevel: "En cours d'apprentissage" | 'Mauvaise' | 'Moyenne' | 'Bonne' | 'Excellente'
    }
}
