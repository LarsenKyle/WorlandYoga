<template>
  <div id="app">
    <nav class="deep-purple accent-4 margin-bottom">
      <a href="#" class="brand-logo">Worland Yoga</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          Settings
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<style lang="scss">
nav {
  .brand-logo {
    padding-left: 1rem;
  }
}
.margin-bottom {
  margin-bottom: 5rem;
}
ul {
  li {
    margin-right: 2rem;
  }
}
</style>
