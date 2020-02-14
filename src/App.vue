<template>
  <div id="app">
    <nav class="cyan darken-4 margin-bottom">
      <router-link id="main-link" class="main-link" to="/">Worland Yoga</router-link>

      <router-link class="main-link link-mobile" to="/report">Monthly Report</router-link>
      <router-link class="main-link link-mobile" to="/settings">Past Classes</router-link>

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
html {
  background-image: url("./assets/forest.svg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  color: #856721;
}
@media only screen and (max-width: 700px) {
  #main-link {
    font-size: 1.4rem;
    margin-right: 1.5rem;
  }
  .main-link {
    &.link-mobile {
      font-size: 1rem;
      display: initial;
    }
  }
}
nav {
  .brand-logo {
    padding-left: 1rem;
  }
}
.link-mobile {
  display: none;
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
