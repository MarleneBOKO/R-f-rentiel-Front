<template>
  <v-container fluid class="page pa-0">
    <div class="login-container">
      <div class="left-panel">
        <div class="fontComplet">
          <div class="part1">
           
          </div>
          <div class="part2">
            <div>
              <span class="firstName">Référentiel </span>
              <div class="secondElement">
                <span
                  >Suivi <span class="thirdElement">Sinistre</span>
                  <span class="fourElement">V.1</span></span
                >
              </div>
            </div>
          </div>
          <div class="part3">
            <img src="../assets/ciad.png" class="logoCiad" alt="John" />
          </div>
        </div>
        <!-- Insérez ici le contenu de la partie gauche de la page, comme le nom du logiciel -->
      </div>
      <div class="right-panel">
        <v-card min-width="500" class="auth-card  elevation-0">
          <v-card-title class="d-flex">
            <!-- <v-img
                :src="require('@/assets/images/logos/logo.svg')"
                max-height="30px"
                max-width="30px"
                alt="logo"
                contain
                class="me-3 "
              ></v-img> -->

            <h2 class="text-2xl mb-10 font-weight-semibold">Se connecter</h2>
          </v-card-title>

          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <!-- <v-select
                    :items="items"
                    prepend-inner-icon="mdi-office-building-outline"
                    label="Entreprise"
                    outlined
                    color="#3A1C71"
                  ></v-select> -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                outlined
                label="Email"
                placeholder="john@example.com"
                hide-details
                class="mb-8"
                color="#3A1C71"
                prepend-inner-icon="mdi-at"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                label="Mot de passe"
                placeholder="Mot de passe"
                prepend-inner-icon="mdi-lock"
                outlined
                color="#3A1C71"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                class="mb-8"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                outlined
                :loading="loading"
                type="submit"
                style="background: #3a1c71"
                class="logButton elevation-0"
                >Se connecter</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { login } from "@/api/auth";
export default {
  name: "loginComponent",
  data: () => ({
    name: "SignIn",
    multiLine: true,
    snackbar: true,
    text: `I'm a multi-line snackbar I'm a multi-line snackbar I'm a multi-line snackbar I'm a multi-line snackbar.`,
    links: [
      "Sinsitre",
      "PV",
      "Expertise",
      "Inventaire",
      "Prospection",
      "Réparation Expresse",
    ],
    loading: false,
    passwordShow: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be 6  characters or more!",
    ],
  }),
  methods: {
    async submitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await login({
            email: this.email,
            password: this.password,
          });

          this.snackbar = true;
          location.reload();
        } catch (error) {
          this.loading = false;
          this.snackbar = false;
        }
      }
    },
  },
};
</script>
<style>
/* Styles pour le design moderne et plat */
body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
  flex: 1;
}
.logoCiad{
  width: 150px;
  height: 50px;

}
.elementLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.rightSection {
  background-color: #fafafa !important;
}
.page {
  height: 100% !important;
  background-color: #fafafa !important;
}
.leftSection {
  border-radius: 10px;
  height: 100vh;
  background-color: #fafafa !important;
}
.lefSectionTop {
  background-color: #3a1c71 !important;
  padding: 20px;
  border-bottom-right-radius: 30px;
}
.lefSectionCenter {
  padding: 10px;
  height: 70vh;
  background-color: #fafafa !important;
}
.lefSectionBottom {
  background-color: #3a1c71 !important;
  padding: 10px;
}
.appTitle {
  color: #fff;
}
.colorText {
  color: #fff !important;
}
.footer {
  background-color: #3a1c71 !important;
}
.logButton {
  height: 50px !important;
  border-radius: 10px;
  background-color: #3a1c71 !important;
  color: #fff !important;
  font-size: 17px !important;
  font-weight: bold !important;
}
.logButton:hover {
  height: 50px !important;
  border-radius: 10px;
  background: #fff !important;
  background: -webkit-linear-gradient(to right, #fff, #fff);
  background: linear-gradient(to right, #fff, #fff);
  color: #3a1c71 !important;
  border: 1px solid #3a1c71;
  font-size: 17px !important;
  font-weight: bold !important;
}
.v-parallax {
  transform: none !important;
  margin-top: 0px;
  width: 100% !important;
  height: 100% !important;
}
.logoImg {
  width: 160px !important;
  height: 80px !important;
}
.form_container {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 40px 20px 40px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  font-family: "Inter", sans-serif;
}

.logo_container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(50%, rgba(248, 248, 248, 0)),
    to(#f8f8f888)
  );
  background: linear-gradient(
    180deg,
    rgba(248, 248, 248, 0) 50%,
    #f8f8f888 100%
  );
  border: 1px solid #f7f7f8;
  -webkit-filter: drop-shadow(0px 0.5px 0.5px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 0.5px 0.5px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  border-radius: 11px;
}

.title_container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.subtitle {
  font-size: 0.725rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.1rem;
  color: #8b8e98;
}

.input_container {
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 5px;
}

.icon {
  width: 20px;
  position: absolute;
  z-index: 99;
  left: 12px;
  bottom: 9px;
}

.input_label {
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}

.input_field {
  width: auto;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  -webkit-filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  -webkit-transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 0px 0px 2px #242424;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.sign-in_btn {
  width: 100%;
  height: 40px;
  border: 0;
  background: #115dfc;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
}

.sign-in_ggl {
  width: 100%;
  height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  border-radius: 7px;
  outline: none;
  color: #242424;
  border: 1px solid #e5e5e5;
  -webkit-filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  cursor: pointer;
}

.sign-in_apl {
  width: 100%;
  height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 10px;
  background: #212121;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  border: 1px solid #e5e5e5;
  -webkit-filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  cursor: pointer;
}

.separator {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 30px;
  color: #8b8e98;
}

.separator .line {
  display: block;
  width: 100%;
  height: 1px;
  border: 0;
  background-color: #e8e8e8;
}

.note {
  font-size: 0.75rem;
  color: #8b8e98;
  text-decoration: underline;
}
.container {
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  color: #ffffff;
  border-radius: 4px 0 0 4px;
  background-color: #ffffff;
}

.left-panel {
  background-image: url("../assets/a.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  flex: 2;
}
.fontComplet {
  background: rgba(31, 11, 68, 0.767);
  background: -webkit-linear-gradient(
    to right,
    rgba(77, 208, 225, 0.9),
    rgba(31, 11, 68, 0.767)
  );
  background: linear-gradient(
    to right,
    rgba(77, 208, 225, 0.9),
    rgba(31, 11, 68, 0.767)
  );
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.part1 {
  flex: 1;
}
.part2 {
  flex: 3;
  display: flex;
  justify-content: start;
  align-items: center;
  align-content: center;
  padding-left: 40px;
}
.firstName {
  font-size: 95px;
  font-weight: bold;
}
.secondElement {
  display: flex;
  font-size: 95px;
  font-weight: 100px;
}
.thirdElement {
  font-size: 95px;
  font-weight: bold;
}
.fourElement {
  font-size: 15px;
}
.part3 {
  flex: 1;
  padding-left: 40px;
    display: flex;
  justify-content: start;
  align-items: center;
  align-content: center;

}
.left-panel h1 {
  margin-top: 0;
  margin-bottom: 30px;
}

.right-panel {
  flex: 1;
  display: flex;
  padding: 30px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.form-group button {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #45a049;
}
</style>
