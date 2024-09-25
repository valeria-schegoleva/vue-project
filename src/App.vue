<script setup>

import UsersTable from "./components/UsersTable.vue";
import { onMounted, ref } from "vue";

const users = ref([]);

onMounted(async () => {
  const response = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users');
  users.value = await response.json();
});

</script>

<template>
  <div class="container">
    <h1 class="title">Cписок пользователей</h1>
    <div class="table">
      <UsersTable :users="users" :sortField="sortField" :sortCriteria="sortCriteria" />
    </div>
  </div>
</template>

<style>
body {
  background-color: #F7F7F7;
}

.container {
  max-width: 1110px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.btn-reset {
  padding: 0;
  outline: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.title {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 24px;
}

.search__wrap {
  display: flex;
  flex-direction: column;
  min-height: 102px;
  padding: 12px 16px;
  margin-bottom: 72px;
  border-radius: 7px;
  box-shadow: 10px 8px 20px 10px rgba(0, 0, 0, 0.2);
}


.btn__clear {
  display: flex;
  gap: 5px;
  max-width: 130px;
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>