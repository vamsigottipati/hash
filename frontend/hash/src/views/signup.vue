<template>
  <div class="main">
    <div class="login-form" style="text-align: center;">
      <h2 class="heading">Signup Using Your Bits Mail</h2>
      <input type="email" v-model="email" placeholder="Your Email" class="email">
      <br>
      <input type="text" class="name" v-model="name" placeholder="Your Name">
      <br>
      <input type="password" class="password" v-model="password" placeholder="Password">
      <br>
      <input
        type="password"
        v-model="password_re"
        placeholder="Re-enter Your Password"
        class="password re"
      >
      <br>
      <button
        class="btn btn-signup"
        @mouseover="isHovering = true"
        @mouseout="isHovering = false"
        @click.prevent="signup"
      >signup</button>
      <br>
      <a @click.prevent="$router.push('login')" class="link">Have An Account</a>
    </div>
    <div class="side-screen">
      <h1>Hash</h1>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  name: "signup",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      password_re: "",
      isHovering: false
    };
  },
  methods: {
    signup() {
      var vm = this;
      if (
        this.password == this.password_re &&
        this.password &&
        this.email &&
        this.name
      ) {
        if (
          this.email.includes("@hyderabad.bits-pilani.ac.in") &&
          this.email.includes("f201")
        ) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(response => {
              alert("Account Created");
              firebase.auth().currentUser.updateProfile({
                displayName: vm.name
              });
              vm.$http
                .post("http://localhost:8080/api/user/", {
                  id: firebase.auth().currentUser.uid,
                  email: vm.email,
                  username: vm.name,
                  password: vm.password
                })
                .then(resp => {
                  console.log(resp);
                  // this.posts = resp.body
                })
                .catch(err => {
                  console.error(err);
                });
              firebase
                .auth()
                .currentUser.sendEmailVerification()
                .then(response => {
                  alert("Verification Mail Sent");
                  vm.$router.push("home");
                })
                .catch(err => {
                  alert(err);
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        alert("Nope");
      }
    }
  }
};
</script>

<style scoped>
.main {
  /* total page */
  height: 100vh;
  width: 100vw;
  display: flex;
  margin: 0px;
  padding: 0px;
  font-family: "Montserrat";
}

input {
  color: #37323e;
}

.heading {
  position: relative;
  color: #37323e;
  margin-top: 15vh;
  margin-bottom: 10vh;
  text-align: center;
  font-size: 32px;
}

.login-form {
  flex: 1;
  color: white;
  float: left;
  width: 50vw;
  text-align: center;
  height: 100vh;
  background: #ffffff;
}

.side-screen {
  font-size: 4em;
  flex: 1;
  height: 100vh;
  width: 50vw;
  text-align: center;
  /* background:linear-gradient(45deg,deeppink, #37323E ); */
  background: #37323e;
}

.side-screen h1 {
  height: 30vh;
  transform: translateY(47.5vh);
  color: white;
  font-size: 4rem;
  padding: 0px;
  margin: 0px;
}

.email {
  all: unset;
  position: relative;
  border-radius: 50px;
  background: #dfdfdf;
  height: 7%;
  width: 45%;
  color: #222222;
}
.name {
  all: unset;
  position: relative;
  border-radius: 50px;
  background: #dfdfdf;
  height: 7%;
  width: 45%;
  color: #222222;
  margin-top: 20px;
}
.password {
  all: unset;
  position: relative;
  margin-top: 20px;
  border-radius: 50px;
  background: #dfdfdf;
  height: 7%;
  width: 45%;
  color: #222222;
}

/* input:focus{
	color: black;
} */

.btn {
  all: unset;
  color: white;
  height: 6.5%;
  width: 10%;
  background: #37323e;
  border-radius: 3px;
  position: relative;
  align-content: center;
  transition: 0.5s;
  font-weight: 700;
}

.btn-signup {
  position: relative;
  margin-top: 10vh;
  margin-bottom: 40px;
  align-content: center;
  text-align: center;
}

.btn:hover {
  color: white;
  cursor: pointer;
}
.link {
  all: unset;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
  position: relative;
  width: 35%;
  align-content: center;
  text-align: center;
}

.link::after {
  position: absolute;
  content: "";
  height: 4px;
  margin: 35px auto;
  left: 0;
  right: 0;
  width: 50%;
  background: #008000;
  transition: 0.5s;
}
.link:hover {
  color: #37323e;
  cursor: pointer;
}
.link:hover:after {
  left: -5%;
  width: 110%;
  background: #37323e;
}

@media screen and (min-width: 1000px) {
  .btn-signup {
    padding-left: 50px;
    padding-right: 50px;
  }
}

@media screen and (max-width: 1000px) {
  .email {
    width: 70%;
  }
  .name {
    width: 70%;
  }
  .password {
    width: 70%;
  }
  .btn-signup {
    width: 30%;
  }
}

@media screen and (max-width: 800px) {
  .email {
    width: 80%;
  }
  .name {
    width: 80%;
  }
  .password {
    width: 80%;
  }
  .btn-signup {
    width: 50%;
  }
}

@media screen and (max-width: 640px) {
  .side-screen {
    display: none;
  }
  .login-form {
    width: 100vw;
  }
  .email {
    width: 50%;
  }
  .name {
    width: 50%;
  }
  .password {
    width: 50%;
  }
  .btn {
    width: 30%;
    padding: 5px 15px 5px 15px;
  }
  .heading {
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15vh;
    margin-bottom: 10vh;
  }
}

@media screen and (max-width: 420px) {
  .side-screen {
    display: none;
  }
  .email {
    width: 80%;
  }
  .name {
    width: 80%;
  }
  .password {
    width: 80%;
  }
  .btn {
    padding: 5px 15px 5px 15px;
  }
  .heading {
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 15vh;
    margin-bottom: 10vh;
  }
}
</style>
