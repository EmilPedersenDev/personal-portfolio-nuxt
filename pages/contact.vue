<template>
  <div class="contact">
    <form @submit.prevent="submit()" :class="{ animate: isContactAnimating }">
      <div class="contact-form-action" v-if="!isMessageSent">
        <h1>Contact</h1>
        <e-input
          type="text"
          placeholder="Name"
          v-model="model.name"
          required
          @blur="$v.model.name.$touch"
          :invalid="$v.model.name.$dirty && $v.model.name.$invalid"
        >
          <span
            slot="error"
            class="input-error"
            v-if="$v.model.name.$dirty && !$v.model.name.required"
            >Name is required.</span
          >
          <span
            slot="error"
            class="input-error"
            v-if="$v.model.name.$dirty && !$v.model.name.alphaLetterValidation"
            >Name must be alphabetic.</span
          >
        </e-input>
        <e-textarea
          type="text"
          placeholder="Message"
          v-model="model.message"
          @blur="$v.model.message.$touch"
          :invalid="$v.model.message.$dirty && $v.model.message.$invalid"
        >
          <span
            slot="error"
            class="input-error"
            v-if="$v.model.message.$dirty && !$v.model.message.required"
            >Message is required.</span
          >
          <span
            slot="error"
            class="input-error"
            v-if="$v.model.message.$dirty && !$v.model.message.minLength"
            >Message must be at least 10 characters.</span
          >
          <span
            slot="error"
            class="input-error"
            v-if="$v.model.message.$dirty && !$v.model.message.maxLength"
            >Message cannot be longer than 1000 characters.</span
          >
        </e-textarea>
        <e-button
          type="submit"
          btnText="Send Message"
          minWidth="150"
          :hasIcon="false"
          :disabled="isDisabled"
          :isLoading="isLoading"
        />
        <e-error :error="error" v-if="Object.keys(error).length !== 0" />
        <span class="required-definition"><span>*</span> Required fields</span>
      </div>
      <e-success v-show="isMessageSent" :isActive="isMessageSent" />
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import alphaLetterValidation from "../services/validations.js";
import { mapMutations } from "vuex";
import Success from "../components/common/success/Success.vue";
import axios from "axios";

export default {
  name: "e-contact",
  components: {
    "e-success": Success,
  },
  data() {
    return {
      model: {
        name: "",
        message: "",
      },
      isMessageSent: false,
      isLoading: false,
      error: {},
      isContactAnimating: false,
    };
  },
  mounted() {
    this.setBlackNavbar(true);
    setTimeout(() => {
      this.isContactAnimating = true;
    }, 1);
  },
  validations: {
    model: {
      name: {
        required,
        alphaLetterValidation,
      },
      message: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(1000),
      },
    },
  },
  methods: {
    ...mapMutations({
      setBlackNavbar: "navbar/SET_BLACK_NAVBAR",
    }),
    async submit() {
      try {
        if (this.$v.$invalid) return;

        for (let value of Object.values(this.model)) {
          if (!value) return;
        }
        this.error = {};
        this.isLoading = true;

        const { status } = await axios.post(
          `${process.env.VUE_APP_API_URL}/message`,
          this.model
        );

        if (status !== 200) {
          throw new Error("Could not send the message.");
        }

        this.isMessageSent = true;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = err.response.data;
      }
    },
  },
  computed: {
    isDisabled() {
      return this.$v.$invalid;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  @include fullHeightAndWidth;
  height: 100vh;
  overflow: hidden;
  background-image: url("../assets/images/forest-creative-gray.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    max-width: 25rem;
    background-color: $black-background;
    padding: 1.25rem;
    box-shadow: 0 0.3125rem 1.5625rem 0.3125rem rgba(0, 0, 0, 0.5);
    transition: all $animation-duration ease $animation-delay;
    transform: translateY(25rem);
    opacity: 0;
    visibility: hidden;
    h1,
    .e-input-group,
    .e-textarea-group,
    .e-button {
      margin: 1.25rem 0;
    }
    h1 {
      text-align: center;
      margin-bottom: 2.1875rem;
    }
    .e-button {
      margin: 1.25rem auto;
    }
    .required-definition {
      font-size: 0.625rem;
      float: right;
      span {
        font-size: 0.875rem;
        color: $pink;
      }
    }

    &.animate {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .about__back-to-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    @include rw-respond-below(m) {
      left: 50%;
      bottom: 5%;
      right: auto;
      transform: translateX(-50%);
      background: $main-background;
      opacity: 0.9;
      border-radius: 0.3125rem;
      padding: 0.625rem;
      z-index: 100;
      img {
        display: none;
      }
      p {
        margin: 0 !important;
        text-decoration: underline;
      }
    }
    right: 5%;
    bottom: 5%;
    img {
      height: 1.25rem;
      width: 1.25rem;
      flex-basis: 100%;
      transform: rotate(180deg);
      animation: bounceUpDown 2s infinite;
    }
    p {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      letter-spacing: 0.125rem;
    }
  }
}

@keyframes bounceUpDown {
  0% {
    transform: translateY(0) rotate(180deg);
  }
  50% {
    transform: translateY(0.625rem) rotate(180deg);
  }

  100% {
    transform: translateY(0) rotate(180deg);
  }
}
</style>
