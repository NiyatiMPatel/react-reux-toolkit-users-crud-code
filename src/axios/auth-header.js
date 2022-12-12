export default function authHeader() {
 const user = JSON.parse(localStorage.getItem('user'));

 if (user && user.idToken) {
  // return { Authorization: 'Bearer ' + user.idToken };
  return { Authorization: `Bearer ${user.idToken}` };
 } else {
  return {};
 }
}