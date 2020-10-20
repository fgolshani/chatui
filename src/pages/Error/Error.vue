<template>
  <q-page class="column mid center">
    <div class="container text-center p-1">
      <q-card class="p-3 bg-white text-grey-9">
        <p class="text-h4">
          صفحه یافت نشد
        </p>
        <p class="title">
          صفحه ای که به دنبال آن می گردید، وجود ندارد، آیا آدرس صفحه مورد نظر خود را به درستی وارد کرده اید؟
        </p>
        <p class="title">
          برای بازگشت به صفحه اصلی، بر روی دکمه زیر کلیک کنید
        </p>

        <div class="center my-1">
          <img src="/statics/images/bulb.svg">
        </div>

        <q-btn color="primary"
          to="/">
          بازگشت به صفحه اصلی
        </q-btn>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 750px;
  .title {
    font-size: 1.2rem;
  }
  img {
    max-height: 150px;
  }
}
</style>

<script src="./Error.ts" lang="ts"></script>