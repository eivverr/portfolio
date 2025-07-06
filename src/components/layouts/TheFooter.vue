<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigationStore.ts'
import { useSeeDetailsStore } from '@/stores/seeDetailsStore.ts'

const seeDetailsStore = useSeeDetailsStore()
const navigationStore = useNavigationStore()
</script>

<template>
    <footer class="h-[35px] bg-black text-white flex items-center justify-between px-6">
        <p class="font-bold">Weier Loris - 2025</p>
        <div class="flex gap-4">
            <div
                v-if="seeDetailsStore.showDetails"
                class="flex items-center justify-center gap-2 h-full"
            >
                <span class="footer-key"> B </span>
                <p>Retour</p>
            </div>
            <div class="flex items-center justify-center gap-2 h-full">
                <div class="flex gap-1">
                    <img src="@/assets/img/arrow-left.svg" alt="Flèche gauche" class="footer-key" />
                    <img
                        src="@/assets/img/arrow-right.svg"
                        alt="Flèche droite"
                        class="footer-key"
                    />
                    <img
                        v-if="!navigationStore.canChangeRoute"
                        src="@/assets/img/arrow-top.svg"
                        alt="Flèche haut"
                        class="footer-key"
                    />
                    <img
                        v-if="!navigationStore.canChangeRoute"
                        src="@/assets/img/arrow-bottom.svg"
                        alt="Flèche bas"
                        class="footer-key"
                    />
                </div>
                <p>Contrôles</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-key {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    font-size: 1.25rem;
    font-weight: bold;
    color: black;
    background-color: white;
    border-radius: 50%;
    z-index: 2; /* Permet d'éviter d'avoir l'ombre de "Voir les détails" qui passe au-dessus */
}
</style>
