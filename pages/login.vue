<template>
    <div class="p-4 grid place-items-center">
        <div class=" max-w-md bg-neutral-800 mt-10 rounded-sm p-4">
      <form @submit.prevent="login">
        <input
          class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none"
          v-model="email"
          type="email"
          placeholder="Email"
        />
        <input
          class="bg-neutral-700 rounded p-1 mb-2 w-full outline-none"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <button @click="login">Login</button>
      </form>
    </div>
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
      password: password.value
    })
    if (error) {
      throw error
    } else {
      router.push('/upload')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
