<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
}

a, a:link, a:visited, a:hover, a:active {
  text-decoration: none;
  color: inherit;
}

#app {
  background: linear-gradient(90deg,rgba(247,149,51,.1),rgba(243,112,85,.1) 15%,rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,rgba(7,179,155,.1) 86%,rgba(109,186,130,.1));
}
</style>
