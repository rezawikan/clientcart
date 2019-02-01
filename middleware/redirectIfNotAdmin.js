export default function ({ app, redirect, route }) {
  if (app.$auth.user.scope != 'admin') {
      return redirect({
        name : 'index'
      })
  }
}
