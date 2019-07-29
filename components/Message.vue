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

  .message
    for i in 0...20
      @media screen and (min-width: 300px * i) and (max-width: 300px * (i + 1) + 200px)
        if i <= 1
          width: 85%
        else if i > 5
          width: 35%
        else
          width: (100 / (i - 0.5)) %
        padding: 1rem;
        margin 0 1rem;
        box-shadow 0 1px 0 0 rgba(50, 50, 50, 0.3);
        border-radius: 4px;
        background #1976d2;
        margin-bottom 1rem;
        p {
          margin-bottom: 0;
        }


  .isOwner {
    background: white;
    color: black;
    align-self: flex-end;
  }
</style>
