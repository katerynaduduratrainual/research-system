#!/usr/bin/env node
// Local timestamp for run logs and `run_started` / `run_finished`: yyyy-mm-ddThh:mm.
const d = new Date();
const pad = n => String(n).padStart(2, "0");
console.log(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
