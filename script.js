let meetings = [];
let notifiedMeetingsBefore = new Set();
let notificationInterval;

function to24HourFloat(timeStr, period) {
  const [hour, minute] = timeStr.split(":").map(Number);
  let h = hour % 12;
  if (period === "PM") h += 12;
  return h + minute / 60;
}

function formatTime(t) {
  let hour = Math.floor(t);
  let minute = Math.round((t - hour) * 60);
  let period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  if (minute < 10) minute = "0" + minute;
  return `${hour}:${minute} ${period}`;
}

function addMeeting() {
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const startPeriod = document.getElementById("startPeriod").value;
  const endPeriod = document.getElementById("endPeriod").value;

  if (!startTime || !endTime) {
    alert("Please enter valid start and end times.");
    return;
  }

  const start = to24HourFloat(startTime, startPeriod);
  const end = to24HourFloat(endTime, endPeriod);

  if (start >= end) {
    alert("Start time must be less than end time.");
    return;
  }

  meetings.push({ start, end });
  displayMeetings();
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
  document.getElementById("startPeriod").value = "AM";
  document.getElementById("endPeriod").value = "AM";
}

function displayMeetings() {
  const container = document.getElementById("meetingCards");
  container.innerHTML = "";
  meetings.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `Meeting ${i + 1}<br><strong>${formatTime(m.start)} - ${formatTime(m.end)}</strong>`;
    container.appendChild(card);
  });
}

function scheduleMeetings() {
  const sorted = [...meetings].sort((a, b) => a.end - b.end);
  const selected = [];
  let lastEnd = -1;
  for (let m of sorted) {
    if (m.start >= lastEnd) {
      selected.push(m);
      lastEnd = m.end;
    }
  }
  displayScheduledMeetings(selected);
}

function displayScheduledMeetings(selected) {
  const container = document.getElementById("scheduledMeetings");
  container.innerHTML = "";
  selected.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "card selected";
    card.innerHTML = `Meeting ${i + 1}<br><strong>${formatTime(m.start)} - ${formatTime(m.end)}</strong>`;
    container.appendChild(card);
  });
}

function resetMeetings() {
  meetings = [];
  notifiedMeetingsBefore.clear();
  document.getElementById("meetingCards").innerHTML = "";
  document.getElementById("scheduledMeetings").innerHTML = "";
}

function startNotification() {
  if (!("Notification" in window)) {
    alert("Notifications not supported.");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission !== "granted") {
      alert("Notification permission denied.");
      return;
    }

    if (notificationInterval) clearInterval(notificationInterval);

    notificationInterval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      meetings.forEach((m, i) => {
        const mHour = Math.floor(m.start);
        const mMin = Math.round((m.start - mHour) * 60);

        let alertBefore = new Date();
        alertBefore.setHours(mHour);
        alertBefore.setMinutes(mMin - 1);

        if (
          hour === alertBefore.getHours() &&
          minute === alertBefore.getMinutes() &&
          !notifiedMeetingsBefore.has(i)
        ) {
          notifiedMeetingsBefore.add(i);
          notifyUser(m, "🔔 Your meeting starts in 1 minute!");
        }
      });
    }, 1000);

    alert("🔔 Notifications enabled (1 min before meeting).");
  });
}

function notifyUser(meeting, message) {
  new Notification(message, {
    body: `${formatTime(meeting.start)} - ${formatTime(meeting.end)}`,
    icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
  });

  const sound = document.getElementById("notificationSound");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch(() => {
      alert("❌ Sound blocked by browser. Try clicking button again.");
    });
  }
}

function testSound() {
  const sound = document.getElementById("notificationSound");
  sound.pause();
  sound.currentTime = 0;
  sound.play()
    .then(() => alert("✅ Sound is working!"))
    .catch(() => alert("❌ Sound blocked by browser. Try again after clicking."));
}

function updateClock() {
  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  const formatted = `${pad(hour)}:${pad(minute)}:${pad(second)} ${period}`;
  document.getElementById("liveClock").innerText = `🕒 Current Time: ${formatted}`;
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}

setInterval(updateClock, 1000);
updateClock();
