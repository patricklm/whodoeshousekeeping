import { DEFAULT_STATE } from './data';
import { nanoid } from 'nanoid';
const { createApp, reactive, computed } = Vue;

createApp({
  setup() {
    const data = reactive({
      ...DEFAULT_STATE,
    });

    /// methods
    const addUserToList = () => {
      const userName = data.inputName;

      if (!isValid(userName)) {
        data.showError = true;
        return;
      }

      const user = {
        id: nanoid(),
        name: userName,
      };
      data.users.push(user);
      data.inputName = '';
    };

    const removeUser = (userId) => {
      const index = data.users.findIndex((user) => user.id === userId);
      data.users.splice(index, 1);
    };

    const isValid = (value) => {
      data.error = '';

      if (!value || value === '') {
        data.error = 'Sorry, no empty name.';
        return false;
      }
      const user = data.users.find(
        (user) => user.name.toLowerCase() === value.toLowerCase()
      );
      if (user) {
        data.error = 'Sorry, names must be unique.';
        return false;
      }
      return true;
    };

    const getRandomUser = () => {
      return data.users[Math.floor(Math.random() * data.users.length)];
    };
    const generateResults = () => {
      let user = getRandomUser();

      if (data.result) {
        while (user.name.toLowerCase() === data.result.toLowerCase()) {
          user = getRandomUser();
        }
      }
      data.result = user.name;
    };
    const showResults = () => {
      generateResults();
      data.state = false;
    };
    const getNewResult = () => {
      generateResults();
    };

    const isReady = computed(() => data.users.length >= 2);
    const resetApp = () => {
      data.state = true;
      data.inputName = '';
      data.users = [];
      data.error = '';
      data.showErrors = false;
      data.result = '';
    };
    return {
      data,
      addUserToList,
      removeUser,
      isReady,
      showResults,
      resetApp,
      getNewResult,
    };
  },
}).mount('#app');
