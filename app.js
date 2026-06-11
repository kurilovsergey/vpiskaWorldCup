(function () {
  const formView = document.getElementById("form-view");
  const ticketView = document.getElementById("ticket-view");
  const form = document.getElementById("ticket-form");
  const matchSelect = document.getElementById("match");
  const btnBack = document.getElementById("btn-back");

  const fields = {
    matchNum: document.getElementById("out-match-num"),
    matchTitle: document.getElementById("out-match-title"),
    datetime: document.getElementById("out-datetime"),
    stadium: document.getElementById("out-stadium"),
    entrance: document.getElementById("out-entrance"),
    gate: document.getElementById("out-gate"),
    stairs: document.getElementById("out-stairs"),
    section: document.getElementById("out-section"),
    row: document.getElementById("out-row"),
    seat: document.getElementById("out-seat"),
    holder: document.getElementById("out-holder"),
    category: document.getElementById("out-category"),
  };

  function initMatchSelect() {
    MATCHES.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = String(m.num);
      opt.textContent = `M${m.num} — ${m.teams} (${m.date}, ${m.stadium})`;
      if (m.num === 36) opt.selected = true;
      matchSelect.appendChild(opt);
    });
  }

  function getMatch(num) {
    return MATCHES.find((m) => m.num === num) || MATCHES[0];
  }

  const ticker = document.getElementById("ticker");
  const tickerTrack = document.getElementById("ticker-track");

  function buildTicker(code) {
    if (!tickerTrack) return;
    tickerTrack.innerHTML = "";

    const makeGroup = () => {
      const group = document.createElement("div");
      group.className = "ticker__group";
      for (let i = 0; i < 10; i += 1) {
        const chip = document.createElement("span");
        chip.className = "ticker__chip";
        chip.textContent = code;
        group.appendChild(chip);
      }
      return group;
    };

    tickerTrack.appendChild(makeGroup());
    tickerTrack.appendChild(makeGroup());
  }

  function showView(view) {
    const isTicket = view === "ticket";
    formView.classList.toggle("view--active", !isTicket);
    formView.hidden = isTicket;
    ticketView.classList.toggle("view--active", isTicket);
    ticketView.hidden = !isTicket;
    document.body.classList.toggle("body--ticket", isTicket);
    if (ticker) {
      ticker.hidden = !isTicket;
      ticker.setAttribute("aria-hidden", String(!isTicket));
    }
  }

  function fillTicket(data) {
    const m = data.match;
    fields.matchNum.textContent = String(m.num);
    fields.matchTitle.textContent = `M${m.num} ${m.teams}`;
    fields.datetime.textContent = `${m.date}, ${m.time}`;
    fields.stadium.textContent = m.stadium;
    fields.entrance.textContent = m.entrance;
    fields.gate.textContent = data.gate;
    fields.stairs.textContent = data.stairs;
    fields.section.textContent = data.section;
    fields.row.textContent = data.row;
    fields.seat.textContent = data.seat;
    fields.holder.textContent = data.holder;
    fields.category.textContent = data.category;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const match = getMatch(Number(matchSelect.value));
    const ticketCode = document.getElementById("ticket-code").value.trim() || "368";
    fillTicket({
      match,
      gate: document.getElementById("gate").value.trim().toUpperCase(),
      stairs: document.getElementById("stairs").value.trim(),
      section: document.getElementById("section").value.trim(),
      row: document.getElementById("row").value.trim().toUpperCase(),
      seat: document.getElementById("seat").value.trim(),
      holder: document.getElementById("holder").value.trim().toUpperCase(),
      category: document.getElementById("category").value,
    });
    buildTicker(ticketCode);
    showView("ticket");
    window.scrollTo(0, 0);
  });

  btnBack.addEventListener("click", () => showView("form"));

  initMatchSelect();
})();
