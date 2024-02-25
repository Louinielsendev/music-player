<template>
  <div>
    <input class="text-black" v-model="email" type="email" placeholder="Email" />
    <input class="text-black" v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
definePageMeta({
        middleware: ['loggedin']
    })
const client = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
    try {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) {
            throw error
        } else {
            router.push('/upload')
        }

    } catch (error){
        console.log(error)
    }
}
</script>
