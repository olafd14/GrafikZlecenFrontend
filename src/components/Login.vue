<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Zaloguj</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Hasło:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      console.log('Z danych:', this.email, this.password); // Debugging
      try {
        // Przesyłanie danych do backendu
        const response = await axios.post('https://localhost:7080/api/home/login', {
          email: this.email,
          password: this.password
        });

        console.log('Odpowiedź z serwera:', response);

        console.log('Status:', response.status);
        console.log('Token:', response.data.token);
        console.log('Role:', response.data.role);

        if (response.status === 200 && response.data.token) {

          localStorage.setItem('token', response.data.token);
          console.log('Form data:', response.data.role);
            if (response.data.role === 'Admin') {
          this.$router.push({ name: 'AdminPage' });
        } else if (response.data.role === 'Koordynator') {
          this.$router.push({ name: 'CoordinatorPage' });
        } else if (response.data.role === 'Pracownik') {
          this.$router.push({ name: 'EmployeePage' });
        } 

        } else {
          this.errorMessage = 'Nieprawidłowa nazwa użytkownika albo hasło';
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Nieprawidłowa nazwa użytkownika albo hasło';
        } else {
          this.errorMessage = 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.';
        }
      }
    }
  },
};
</script>


<style scoped>


.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-image: url('/images/LoginViewBackground.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.login-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #0f611d;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>