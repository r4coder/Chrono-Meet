# ⏰ ChronoMeet – Smart Real-Time Meeting Scheduler

ChronoMeet is a sleek and intuitive meeting scheduling tool that helps you **plan optimal non-overlapping meetings**, get **real-time notifications**, and stay ahead with **sound alerts 1 minute before every meeting**.

> ## 🚀 Features

- ✅ **Greedy Algorithm** to auto-schedule max non-overlapping meetings  
- 🔔 **Sound + Notification Alerts** exactly 1 minute before meetings  
- 🕒 **Live Clock** synced with your system time  
- 🌐 Responsive **HTML, CSS & JavaScript** frontend (no libraries)  
- 🎵 **Custom .mp3 notification sound** support  
- 🔁 Manual + Auto scheduling support  
- 🔊 “Test Sound” button for quick checks  
- ☁️ Ready for deployment via GitHub Pages or Vercel  

---

## 📸 Screenshots

> _(Insert screenshots here of UI showing meetings, live clock, and notification prompt)_

---

## 🧠 Tech Stack & Concepts

| Layer        | Details                                                                 |
|--------------|-------------------------------------------------------------------------|
| Frontend     | HTML, CSS (Flexbox), Vanilla JavaScript                                 |
| Logic        | Greedy Algorithm (Activity Selection Problem)                           |
| Real-Time    | `setInterval()` + system time sync using `Date()`                       |
| Browser APIs | `Notification API`, `Audio API`                                         |
| UX Boosters  | AM/PM input, Reset, Test Sound, Live Clock                              |

---

## 🧪 How It Works

1. Add meetings with **start & end time (12-hour format with AM/PM)**  
2. Hit ✅ Auto Schedule to select optimal slots  
3. Click 🔔 Notify Me to enable real-time meeting tracking  
4. When **1 minute before a meeting**, a system notification + sound plays  
5. 🎧 You can also test the sound manually with the “Test Sound” button  

---

## 📚 Algorithms Used

- 🧠 **Activity Selection Problem (Greedy)**
   - Meetings are sorted by end time
   - Selected greedily to maximize non-overlapping slots

```js
const sorted = [...meetings].sort((a, b) => a.end - b.end);
const selected = [];
let lastEnd = -1;
for (let m of sorted) {
  if (m.start >= lastEnd) {
    selected.push(m);
    lastEnd = m.end;
  }
}
```

---

## 📁 Project Structure

```
📦 ChronoMeet/
├── index.html          # Main UI
├── style.css           # Styling
├── script.js           # Core logic & real-time notifications
├── notification.mp3    # Custom alert sound
├── README.md           # You're here!
```

---

## 🔧 Setup Instructions

1. Clone or download the repository
2. Place your own `notification.mp3` file in the same folder
3. Open `index.html` using Live Server or local browser
4. Allow notification permissions when prompted

---

## ✅ Sample Use Case

```
Input Meetings:
(9:00 AM - 10:30 AM)
(10:00 AM - 11:00 AM)
(10:30 AM - 12:00 PM)
(12:00 PM - 1:00 PM)

Auto Schedule Result:
(9:00 AM - 10:30 AM)
(12:00 PM - 1:00 PM)

Real-time alert at 8:59 AM and 11:59 AM 🔔
```

---

## 📣 Credits

Built with 💙 by r4coder  
Crafted for smart scheduling needs with real-time functionality and clean UI.

---

## 🌐 Deployment

- GitHub Pages: Upload the repo and enable GitHub Pages from settings
- Vercel/Netlify: Drag and drop the folder or connect to GitHub

---

## 🏷️ Tags

`#GreedyAlgorithm` `#RealTimeApp` `#MeetingScheduler` `#HTMLCSSJS` `#VanillaJS` `#25LPAProject` `#ChronoMeet`
