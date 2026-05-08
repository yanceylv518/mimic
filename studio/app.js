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
  rulesList: document.querySelector("#rulesList"),
  screenshotInput: document.querySelector("#screenshotInput"),
  sourceImage: document.querySelector("#sourceImage"),
  statusPill: document.querySelector("#statusPill")
};
elements.uploadButton = document.querySelector("#uploadButton");

elements.refreshButton.addEventListener("click", () => refresh());
elements.pageId.addEventListener("change", () => {
  state.pageId = elements.pageId.value;
  refreshPage();
});
elements.optimizeButton.addEventListener("click", () => optimize());
elements.uploadButton.addEventListener("click", () => uploadAndGenerate());

await bootstrap();

async function bootstrap() {
  const payload = await fetchJson("/api/pages");
  const rulesPayload = await fetchJson("/api/rules");
  elements.pageId.innerHTML = payload.pages
    .map((page) => `<option value="${escapeHtml(page.pageId)}">${escapeHtml(page.pageId)}</option>`)
    .join("");
  state.pageId = payload.pages.at(-1)?.pageId ?? "";
  elements.pageId.value = state.pageId;
  renderRules(rulesPayload.rules);
  await refreshPage();
}

async function refresh() {
  const payload = await fetchJson("/api/pages");
  const rulesPayload = await fetchJson("/api/rules");
  const selected = state.pageId;
  elements.pageId.innerHTML = payload.pages
    .map((page) => `<option value="${escapeHtml(page.pageId)}">${escapeHtml(page.pageId)}</option>`)
    .join("");
  state.pageId = payload.pages.some((page) => page.pageId === selected)
    ? selected
    : payload.pages.at(-1)?.pageId ?? "";
  elements.pageId.value = state.pageId;
  renderRules(rulesPayload.rules);
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
    const job = await fetchJson(`/api/pages/${state.pageId}/optimize`, {
      body: JSON.stringify({
        maxRounds: 1,
        note: elements.noteInput.value.trim()
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    await waitForJob(job.id);
  }, "正在优化，这可能需要几分钟...");
}

async function uploadAndGenerate() {
  const file = elements.screenshotInput.files?.[0];

  if (!file) {
    elements.actionStatus.textContent = "请选择一张截图";
    return;
  }

  await runAction(async () => {
    const dataUrl = await readFileAsDataUrl(file);
    const created = await fetchJson("/api/pages", {
      body: JSON.stringify({
        dataUrl,
        fileName: file.name
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    state.pageId = created.pageId;
    const job = await fetchJson(`/api/pages/${created.pageId}/generate`, {
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    await waitForJob(job.id);
    await refresh();
  }, "正在上传并生成页面，这可能需要几分钟...");
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

async function waitForJob(jobId) {
  while (true) {
    const job = await fetchJson(`/api/jobs/${jobId}`);
    elements.actionStatus.textContent = formatJobStatus(job);

    if (job.status === "passed") {
      return job;
    }

    if (job.status === "failed") {
      throw new Error(job.error ?? "任务失败");
    }

    await delay(1200);
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

function renderRules(rules) {
  elements.rulesList.innerHTML = rules.length
    ? rules
        .map(
          (rule) =>
            `<div class="rule-item" title="${escapeHtml(rule.path)}">${escapeHtml(rule.name)}</div>`
        )
        .join("")
    : `<div class="rule-item">暂无规则</div>`;
}

function setBusy(isBusy, text = "") {
  elements.optimizeButton.disabled = isBusy;
  elements.refreshButton.disabled = isBusy;
  elements.uploadButton.disabled = isBusy;
  for (const button of elements.iterations.querySelectorAll("button")) {
    button.disabled = isBusy;
  }
  elements.actionStatus.textContent = text;
}

function formatJobStatus(job) {
  const step = job.step ? ` · ${job.step}` : "";
  const stepStatus = job.stepStatus ? ` · ${job.stepStatus}` : "";
  return `${job.label}${step}${stepStatus}`;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
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
