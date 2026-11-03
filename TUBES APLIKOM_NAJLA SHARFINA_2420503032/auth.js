// Penjaga halaman: tanpa database, sesi disimpan di browser (sessionStorage / localStorage).
const AUTH_KEY='jembatan_auth';
function getAuth(){
  try{return JSON.parse(sessionStorage.getItem(AUTH_KEY)||localStorage.getItem(AUTH_KEY)||'null')}catch(e){return null}
}
function logout(){
  try{sessionStorage.removeItem(AUTH_KEY);localStorage.removeItem(AUTH_KEY)}catch(e){}
  location.replace('login.html');
}
const AUTH=getAuth();
if(!AUTH)location.replace('login.html');
document.addEventListener('DOMContentLoaded',()=>{
  const w=document.getElementById('who'),b=document.getElementById('logout');
  if(w&&AUTH)w.textContent='Halo, '+AUTH.name;
  if(b)b.onclick=logout;
});
