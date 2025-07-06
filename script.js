// يسجّل أوقات الزيارات في المتصفّح
const visits = JSON.parse(localStorage.getItem("visitLogs") || "[]");
const now = Date.now();

// أبقِ فقط الزيارات التي حصلت خلال آخر 30 ثانية
const recentVisits = visits.filter(ts => now - ts <= 30_000);
recentVisits.push(now);
localStorage.setItem("visitLogs", JSON.stringify(recentVisits));

// إذا تجاوزنا 10 زيارات خلال 30 ثانية…
if (recentVisits.length > 10) {
  alert("أنت تزور الصفحة كثيرًا! سيتم حظرك مؤقتًا.");
  document.body.innerHTML =
    "<h1 style='text-align:center;margin-top:20vh;'>تم حظرك مؤقتًا</h1>";
  setTimeout(() => {
    localStorage.removeItem("visitLogs");   // امسح العدّاد
    location.reload();                       // أعد تحميل الصفحة بعد 10 دقائق
  }, 10 * 60 * 1000); // 10 دقائق
}
