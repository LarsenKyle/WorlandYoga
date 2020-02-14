<template>
  <div id="app">
    <nav class="deep-purple accent-4 margin-bottom">
      <router-link class="main-link" to="/">Worland Yoga</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link to="/settings">Past Classes</router-link>
        </li>
        <li>
          <router-link to="/report">Monthly Reports</router-link>
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
.main-link {
  font-size: 2.1rem;
  margin-left: 1rem;
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
