<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-xs-center">{{text}}</p>
      <hr>
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{isOwner}">
        <small><strong>{{name}}</strong></small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      text: String,
      isOwner: {
        type: Boolean,
        default: false
      }
    },
    name: 'message'
  }
</script>

<style lang="stylus" scoped>
  .system {
    margin-bottom: 1 rem;
    p {
      margin-bottom: 1 rem;
    }
  }
  .wrap {
    display: flex;
    flex-direction column;
  }

  @media screen and (min-width: 1000px)  {
    .message {
      padding: 1rem;
      width: 45%;
      margin 0 1rem;
      box-shadow 0 1px 0 0 rgba(50, 50, 50, 0.3);
      border-radius: 4px;
      background #1976d2;
      margin-bottom 1rem;
      p {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (min-width: 800px) and (max-width: 1000px) {
    .message {
      padding: 1rem;
      width: 55%;
      margin 0 1rem;
      box-shadow 0 1px 0 0 rgba(50, 50, 50, 0.3);
      border-radius: 4px;
      background #1976d2;
      margin-bottom 1rem;
      p {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (min-width: 500px) and (max-width: 800px) {
    .message {
      padding: 1rem;
      width: 65%;
      margin 0 1rem;
      box-shadow 0 1px 0 0 rgba(50, 50, 50, 0.3);
      border-radius: 4px;
      background #1976d2;
      margin-bottom 1rem;
      p {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (min-width: 300px) and (max-width: 500px) {
    .message {
      padding: 1rem;
      width: 80%;
      margin 0 1rem;
      box-shadow 0 1px 0 0 rgba(50, 50, 50, 0.3);
      border-radius: 4px;
      background #1976d2;
      margin-bottom 1rem;
      p {
        margin-bottom: 0;
      }
    }
  }




  .isOwner {
    background: white;
    color: black;
    align-self: flex-end;
  }
</style>
