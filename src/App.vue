<template>
  <div id="app">
    <nav class="deep-purple accent-4 margin-bottom">
      <a href="#" class="brand-logo">Worland Yoga</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">JavaScript</a>
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
</style>
