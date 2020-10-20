<template>
  <div class="max-container center">

    <FormContainer :container="container"
      :form="form"
      @submit="submit">

      <q-toolbar class="bg-accent text-white header"
        slot="header">
        <q-toolbar-title class="title">
          Sign Up
        </q-toolbar-title>
      </q-toolbar>
      <div slot="button"
        class="column mid">
        <q-card-section class="column center">
          <q-btn :loading="container.loading"
            type="submit"
            label="Sign Up"
            color="accent"
            class="my-1 sign-btn" />
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
  width: 200px;
}
</style>

<style lang="scss">
</style>


<script src="./Register.ts" lang="ts"></script>
