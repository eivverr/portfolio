export const languages = {
    java: { name: 'Java', color: '#ff0000' },
    python: { name: 'Python', color: '#ffd845' },
    html: { name: 'Html5', shortName: 'Html', color: '#ff0000' },
    javascript: { name: 'Javascript', shortName: 'JS', color: '#f7df1e' },
    php: { name: 'Php', color: '#777bb3' },
    unity: { name: 'Unity', color: '#000000' },
} as const satisfies Record<string, LanguageType>
