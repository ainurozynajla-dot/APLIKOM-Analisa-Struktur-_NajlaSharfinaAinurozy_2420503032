// Daftar akun ada di sini, jadi tidak perlu database. Ubah sesuai kebutuhan.
// Catatan: ini hanya pengaman tampilan di sisi browser, bukan keamanan sungguhan.
const USERS = [
  { u: "admin", p: "najla", name: "Admin" }, // untuk merubah nama_pengguna dan kata_sandi
  { u: "mahasiswa", p: "sipil2024", name: "Mahasiswa" }, // untuk merubah nama_pengguna dan kata_sandi
];
const KEY = "jembatan_auth",
  $ = (id) => document.getElementById(id);

function save(name, remember) {
  const data = JSON.stringify({ name, at: Date.now() });
  try {
    sessionStorage.removeItem(KEY);
    localStorage.removeItem(KEY);
    (remember ? localStorage : sessionStorage).setItem(KEY, data);
  } catch (e) {
    $("err").textContent = "Browser memblokir penyimpanan sesi. Aktifkan penyimpanan lokal lalu coba lagi.";
    return false;
  }
  return true;
}
function enter() {
  location.replace("index.html");
}

try {
  if (sessionStorage.getItem(KEY) || localStorage.getItem(KEY)) enter();
} catch (e) {}

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = $("user").value.trim().toLowerCase(),
    p = $("pass").value;
  const hit = USERS.find((x) => x.u === u && x.p === p);
  if (!hit) {
    $("err").textContent = "Nama pengguna atau kata sandi belum cocok. Periksa huruf besar dan kecilnya.";
    $("pass").focus();
    return;
  }
  if (save(hit.name, $("remember").checked)) enter();
});
$("guest").onclick = () => {
  if (save("Tamu", false)) enter();
};
$("toggle").onclick = () => {
  const show = $("pass").type === "password";
  $("pass").type = show ? "text" : "password";
  $("toggle").textContent = show ? "Sembunyikan" : "Tampilkan";
  $("toggle").setAttribute("aria-pressed", show);
};
