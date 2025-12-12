<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-5 space-y-6">
            <h6 v-if="errorMessage" class="text-red-500 text-center">
                {{ errorMessage }}
            </h6>
            <h6 v-if="successMessage" class="text-green-500 text-center">
                {{ successMessage }}
            </h6>

            <UIInput
                v-model="data.name"
                label="Full Name"
                placeholder="Joshua Gato"
                v-if="isRegister"
            />

            <UIInput
                v-model="data.email"
                label="Email"
                placeholder="joshuagato37@gmail.com"
                v-if="isRegister"
            />

            <UIInput
                v-model="data.username"
                label="Username"
                placeholder="@username"
            />

            <UIInput
                label="Password"
                placeholder="********"
                type="password"
                v-model="data.password"
            />

            <UIInput
                label="Confirm Password"
                placeholder="********"
                type="password"
                v-model="data.repeatPassword"
                v-if="isRegister"
            />

            <UIButton
                @click="handleLogin"
                liquid
                :disabled="isButtonDisabled"
                v-if="!isRegister"
            >
                Login
            </UIButton>

            <UIButton
                @click="handleRegister"
                liquid
                :disabled="isRegisterButtonDisabled"
                v-if="isRegister"
            >
                Register
            </UIButton>

            <div class="text-center">
                <p class="text-gray-500" v-if="isRegister">
                    Already registered?
                    <button
                        class="text-blue-500"
                        @click="toggleRegisterAndLogin(false)"
                    >
                        Log In here
                    </button>
                </p>
                <p class="text-gray-500" v-if="!isRegister">
                    Not yet a member?
                    <button
                        class="text-green-500"
                        @click="toggleRegisterAndLogin(true)"
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
const isRegister = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const toggleRegisterAndLogin = (booleanValue) => {
    isRegister.value = booleanValue;
    errorMessage.value = "";
    successMessage.value = "";
};

const data = reactive({
    name: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    loading: false,
});

async function handleLogin() {
    const { login } = useAuth();

    data.loading = true;
    try {
        await login({
            username: data.username,
            password: data.password,
        });
    } catch (error) {
        errorMessage.value = error.statusMessage;
    } finally {
        data.loading = false;
    }
}

async function handleRegister() {
    const { register } = useAuth();

    data.loading = true;
    try {
        const responseMessage = await register({
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            repeatPassword: data.repeatPassword,
        });
        successMessage.value = responseMessage;
    } catch (error) {
        errorMessage.value = error;
    } finally {
        data.loading = false;
    }
}

const isButtonDisabled = computed(() => {
    return !data.username || !data.password || data.loading;
});

const isRegisterButtonDisabled = computed(() => {
    return (
        !data.name ||
        !data.email ||
        !data.repeatPassword ||
        !data.password ||
        data.loading
    );
});
</script>
