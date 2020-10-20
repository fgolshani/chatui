<template>
  <div class="max-container center">
    <FormContainer :container="container"
      :form="form"
      @submit="submit">

      <q-toolbar class="bg-accent text-white"
        slot="header">
        <q-toolbar-title class="title">
          Login Page
        </q-toolbar-title>
      </q-toolbar>

      <div slot="button"
        class="column mid">
        <q-card-section class="column mid center">
          <q-btn :loading="container.loading"
            type="submit"
            label="Login"
            color="accent"
            class="my-1 login-btn" />

        </q-card-section>
      </div>
    </FormContainer>
  </div>

</template>

<style lang="scss" scoped>
@import "src/css/partial/_mixin.scss";

.title {
  font-size: 1.3rem;
}

.sign-btn {
  border: 4px solid $accent;
  border-radius: 8px;
  width: 200px;
  border-color: $primary;
}

.login-btn {
  width: 200px;
}

.modal {
  @include screen(web) {
    width: 500px;
  }
  @include screen(tablet) {
    width: 400px;
  }
  @include screen(mobile) {
    width: 250px;
  }
}
</style>

<style lang="scss">
</style>


<script src="./Login.ts" lang="ts"></script>
