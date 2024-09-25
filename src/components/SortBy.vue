<script setup>

const emit = defineEmits(['sort']);

const handleSort = (criteria) => {
    emit('sort', criteria);
};

</script>
<template>
    <div class="sort__box">
        <p class="sort__title">Сортировка:</p>
        <button class="btn-sort btn-reset" @click="handleSort('registration_date')">Дата регистрации</button>
        <button class="btn-sort btn-reset" @click="handleSort('rating')">Рейтинг</button>
    </div>
</template>

<style>
.sort__box {
    display: flex;
    gap: 20px;
    padding-bottom: 16px;
    font-size: 10px;
    color: #9EAAB4;
}

.sort__title {
    font-size: 10px;
    color: #9EAAB4;
    pointer-events: none;
}

.btn-sort {
    font-size: 10px;
    color: #9EAAB4;
    transition: color 0.3s ease-in-out;
}

.btn-sort:hover {
    color: #9EAAB4;
    border-bottom: 2px dashed #9EAAB4;
}

.btn-sort:active {
    color: #333333;
    border-bottom: 2px dashed #333333;
}
</style>