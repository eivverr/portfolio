export {}

declare global {
    interface Project {
        name: string
        language: LanguageType
        nbPeople: number
        link: string
        description: string
        category:
            | '🔗 Site Web'
            | '🌐 Application Web'
            | '📱 Application Mobile'
            | '💻 Application Desktop'
            | '🥽 Application de Réalité Mixte'
            | '🎮 Jeu Vidéo'
            | '🤖 Bot'
            | '⚙️ Autre'
    }
}
