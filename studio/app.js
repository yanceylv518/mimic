const state = {
  pageId: ""
};

const elements = {
  actionStatus: document.querySelector("#actionStatus"),
  generatedImage: document.querySelector("#generatedImage"),
  iterations: document.querySelector("#iterations"),
  noteInput: document.querySelector("#noteInput"),
  optimizeButton: document.querySelector("#optimizeButton"),
  pageId: document.querySelector("#pageId"),
  pageTitle: document.querySelector("#pageTitle"),
  refreshButton: document.querySelector("#refreshButton"),
  sourceImage: document.querySelector("#sourceImage"),
  statusPill: document.querySelector("#statusPill")
};

elements.refreshButton.addEventListener("click", () => refresh());
elements.pageId.addEventListener("change", () => {
  state.pageId = elements.pageId.value;
  refreshPage();
});
elements.optimizeButton.addEventListener("click", () => optimize());

await bootstrap();

async function bootstrap() {
  const payload = await fetchJson("/api/pages");
  elements.pageId.innerHTML = payload.pages
    .map((page) => `<option value="${escapeHtml(page.pageId)}">${escapeHtml(page.pageId)}</option>`)
    .join("");
  state.pageId = payload.pages.at(-1)?.pageId ?? "";
  elements.pageId.value = state.pageId;
  await refreshPage();
}

async function refresh() {
  await refreshPage();
}

async function refreshPage() {
  if (!state.pageId) {
    return;
  }

  const page = await fetchJson(`/api/pages/${state.pageId}`);
  elements.pageTitle.textContent = page.pageId;
  elements.statusPill.textContent = page.status;
  elements.sourceImage.src = withCache(page.artifacts.sourceScreenshot);
  elements.generatedImage.src = withCache(page.artifacts.generatedPreview);
  renderIterations(page.iterations);
}

async function optimize() {
  await runAction(async () => {
    await fetchJson(`/api/pages/${state.pageId}/optimize`, {
      body: JSON.stringify({
        maxRounds: 1,
        note: elements.noteInput.value.trim()
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  }, "正在优化，这可能需要几分钟...");
}

async function accept(iteration) {
  await runAction(
    () =>
      fetchJson(`/api/pages/${state.pageId}/iterations/${iteration}/accept`, {
        body: JSON.stringify({
          note: "Accepted in Page Mimic Studio"
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }),
    `已接受 ${iteration}`
  );
}

async function reject(iteration) {
  await runAction(
    () =>
      fetchJson(`/api/pages/${state.pageId}/iterations/${iteration}/reject`, {
        body: JSON.stringify({
          note: "Rejected in Page Mimic Studio"
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }),
    `已回退 ${iteration}`
  );
}

async function runAction(action, pendingText) {
  setBusy(true, pendingText);

  try {
    await action();
    elements.actionStatus.textContent = "完成";
    await refreshPage();
  } catch (error) {
    elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
  } finally {
    setBusy(false);
  }
}

function renderIterations(iterations) {
  if (!iterations.length) {
    elements.iterations.innerHTML = `<p class="iteration-meta">暂无迭代记录。</p>`;
    return;
  }

  elements.iterations.innerHTML = iterations
    .slice()
    .reverse()
    .map(
      (iteration) => `
        <article class="iteration">
          <div>
            <h3>${escapeHtml(iteration.iteration)} · ${escapeHtml(labelForIteration(iteration))}</h3>
            <p class="iteration-meta">${escapeHtml(iteration.note ?? "无人工提示")}</p>
            <p class="iteration-meta">
              <a href="${iteration.artifacts.before}" target="_blank" rel="noreferrer">before</a>
              ·
              <a href="${iteration.artifacts.after}" target="_blank" rel="noreferrer">after</a>
              ·
              <a href="${iteration.artifacts.feedback}" target="_blank" rel="noreferrer">feedback</a>
              ·
              <a href="${iteration.artifacts.result}" target="_blank" rel="noreferrer">result</a>
            </p>
          </div>
          <div class="iteration-actions">
            ${
              iteration.canDecide
                ? `<button type="button" data-action="accept" data-iteration="${escapeHtml(iteration.iteration)}">A 接受</button>
            <button class="secondary" type="button" data-action="optimize">B 继续</button>
            <button class="danger" type="button" data-action="reject" data-iteration="${escapeHtml(iteration.iteration)}">C 回退</button>`
                : `<span class="decision">${escapeHtml(decisionText(iteration))}</span>
            <button class="secondary" type="button" data-action="optimize">B 继续</button>`
            }
          </div>
        </article>
      `
    )
    .join("");

  for (const button of elements.iterations.querySelectorAll("button")) {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const iteration = button.dataset.iteration;

      if (action === "accept") {
        accept(iteration);
      } else if (action === "reject") {
        reject(iteration);
      } else {
        optimize();
      }
    });
  }
}

function setBusy(isBusy, text = "") {
  elements.optimizeButton.disabled = isBusy;
  elements.refreshButton.disabled = isBusy;
  for (const button of elements.iterations.querySelectorAll("button")) {
    button.disabled = isBusy;
  }
  elements.actionStatus.textContent = text;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed: ${response.status}`);
  }

  return payload;
}

function labelForIteration(iteration) {
  if (iteration.decisionAction === "accept") {
    return `${iteration.status} · 已接受`;
  }

  if (iteration.decisionAction === "reject") {
    return `${iteration.status} · 已回退`;
  }

  return iteration.status;
}

function decisionText(iteration) {
  if (iteration.decisionAction === "accept") {
    return "已接受";
  }

  if (iteration.decisionAction === "reject") {
    return "已回退";
  }

  return iteration.status === "passed" ? "已处理" : "不可决策";
}

function withCache(url) {
  return `${url}?t=${Date.now()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
