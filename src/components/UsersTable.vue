<script setup>
import { ref, computed } from "vue";
import SearchForm from "./SearchForm.vue";
import ClearFilters from "./ClearFilters.vue";
import SortBy from "./SortBy.vue";

let search_string = ref('');
let sort_field = ref('registration_date');
let sort_criteria = ref('false');


const props = defineProps({
    users: {
        type: Array,
        required: true
    },
    sortField: {
        type: String,
        required: true
    },
    sortCriteria: {
        type: Boolean,
        default: false
    },
});

const filteredUsers = computed(() => {
    let filtered = props.users;

    if (search_string.value) {
        filtered = filtered.filter(user =>
            user.username.toLowerCase().includes(search_string.value.toLowerCase())
        );
    }

    return [...filtered].sort((a, b) => {
        if (sort_field.value === 'registration_date') {
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);

            return sort_criteria.value ? dateB - dateA : dateA - dateB;
        }

        if (sort_field.value === 'rating') {
            const ratingA = parseInt(a.rating, 10);
            const ratingB = parseInt(b.rating, 10);

            return sort_criteria.value ? ratingB - ratingA : ratingA - ratingB;
        }

        return 0;
    }
    );
});

const handleSearch = (search) => {
    search_string.value = search
};

const clearSearch = () => {
    search_string.value = '';
};

const handleSort = (field, criteria) => {
    sort_field.value = field;
    sort_criteria.value = criteria;
};

const isDeletePopupVisible = ref(false);
const selectedUser = ref(null);

const openDeletePopup = (user) => {
    selectedUser.value = user;
    isDeletePopupVisible.value = true;
    document.body.classList.add('popup-open');
};

const closeDeletePopup = () => {
    selectedUser.value = null;
    isDeletePopupVisible.value = false;
    document.body.classList.remove('popup-open');
};

const deleteUser = () => {
    const updatedUsers = props.users.filter(user => user.id !== selectedUser.value.id);
    props.users.splice(0, props.users.length, ...updatedUsers);
    closeDeletePopup();
};

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2,
        '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
}
</script>

<template>
    <div class="search__wrap">
        <SearchForm :search="search_string" @search="handleSearch" />
        <ClearFilters @clearFilters="clearSearch" />
    </div>
    <SortBy @sort="handleSort" />
    <div class="table__wrap">
        <table class="table__content">
            <thead>
                <tr class="table__headers">
                    <th class="row">Имя пользователя</th>
                    <th>E-mail</th>
                    <th>Дата регистрации</th>
                    <th>Рейтинг</th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="table__username row">{{ user.username }}</td>
                    <td class="table__email">{{ user.email }}</td>
                    <td class="table__registation">{{ formatDate(user.registration_date) }}</td>
                    <td class="table__rating">{{ user.rating }}</td>
                    <td class="table__delete">
                        <button @click="openDeletePopup(user)" class="btn-reset">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L20 20" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M4 20L20 4" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-show="isDeletePopupVisible" class="popup">
            <p class="popup__text">Вы уверены, что хотите удалить пользователя?</p>
            <div class="btn__wrap">
                <button class="btn-yes btn-reset" @click="deleteUser">Да</button>
                <button class="btn-no btn-reset" @click="closeDeletePopup">Нет</button>
            </div>
        </div>
    </div>
</template>

<style>
.table {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 500px;
}

.row {
    height: 30px;
}

.table__wrap {
    color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px rgba(0.05, 0.05, 0.05, 0.05);
}

.table__content {
    width: 100%;
    padding-left: 16px;
    padding-top: 16px;
}

.table__headers {
    text-align: left;
    font-size: 10px;
    color: #9EAAB4;
}

.table__username {
    font-size: 12px;
    font-weight: 700;
    color: #0CB4F1;
}

.table__email {
    font-size: 12px;
    font-weight: 500;
    color: #ACACAC;
}

.table__registation {
    font-size: 12px;
    font-weight: 500;
    color: #ACACAC;
}

.table__rating {
    font-size: 12px;
    font-weight: 500;
    color: #ACACAC;
}

.users__list {
    width: 100%;
    min-height: 500px;
    list-style: none;
}

.popup-open * {
    pointer-events: none;
}

.popup-open .popup,
.popup-open .popup * {
    pointer-events: auto;
    opacity: 1;
}

.popup-open .popup-overlay {
    background: rgba(0, 0, 0, 0.5);
}

.popup {
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 353px;
    height: 134px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background: white;
    padding: 20px;
    border-radius: 8px;
}

.popup__text {
    margin-bottom: 24px;
    font-size: 12px;
    color: black;
}

.popup .btn-yes {
    width: 88px;
    height: 27px;
    font-size: 12px;
    border-radius: 3px;
    color: #ACACAC;
    background-color: #E0E0E0;
}

.popup .btn-no {
    width: 88px;
    height: 27px;
    font-size: 12px;
    border-radius: 3px;
    color: #FFFFFF;
    background-color: #0CB4F1;
}

.btn__wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
</style>