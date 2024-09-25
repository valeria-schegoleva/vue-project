<script setup>

    import { ref, watch } from "vue";
    
    const props = defineProps({
        search: {
        type: String,
        required: false,
        default: '',
  }
    });

    const searchValue = ref(props.search);

    watch(() => props.search, (newSearch) => {
    searchValue.value = newSearch;
    });

    const emit = defineEmits(['search']);
    const handleSearchInput = (e) => {
    searchValue.value = e.target.value;
    emit('search', searchValue.value); 
};
</script>

<template>
    <form>
        <div class="search__box">
            <input type="text" :value="searchValue" @input="handleSearchInput" id="search__input" class="search__input" placeholder="Поиск по имени или e-mail">
            <span class="search-icon">
            <svg alt="Иконка поиска" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 15.5L20 19" stroke="#9EAAB4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 11C6 14.3137 8.68629 17 12 17C13.6597 17 15.1621 16.3261 16.2483 15.237C17.3308 14.1517 18 12.654 18 11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11Z" stroke="#9EAAB4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </span>
        </div>
    </form>
</template>

<style>
.search__box {
    position: relative;
  }

  .search__input {
    min-height: 34px;
    width: 100%;
    padding: 9px 31px;
    padding-left: 35px;
    margin-bottom: 24px;
    border-radius: 4px;
    color: #9EAAB4;
    background-color: #ECEFF0;
    border: none;
    outline: none;
  }

  .search-icon {
    position: absolute;
    left: 5px; 
    top: 10%;
    height: 16px; 
    width: 16px;
  }

</style>