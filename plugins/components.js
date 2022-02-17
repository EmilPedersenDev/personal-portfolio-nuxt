import Vue from "vue";
import Spinner from "~/components/common/spinner/Spinner.vue";
import Slider from "~/components/common/transitions/Slider.vue";
import Button from "~/components/common/button/Button.vue";
import Input from "~/components/common/input/Input.vue";
import Textarea from "~/components/common/textarea/Textarea.vue";
import Error from "~/components/common/error/Error.vue";

Vue.component("e-spinner", Spinner);
Vue.component("e-slider", Slider);
Vue.component("e-button", Button);
Vue.component("e-input", Input);
Vue.component("e-textarea", Textarea);
Vue.component("e-error", Error);
