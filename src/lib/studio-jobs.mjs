const jobs = new Map();

export function createStudioJob({ label, page, task, type }) {
  const job = {
    error: null,
    finishedAt: null,
    id: `job-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    label,
    page,
    result: null,
    startedAt: new Date().toISOString(),
    status: "running",
    step: "queued",
    type
  };

  jobs.set(job.id, job);

  queueMicrotask(async () => {
    try {
      updateStudioJob(job.id, { step: "starting" });
      job.result = await task({
        onProgress: (progress) => updateStudioJob(job.id, progress)
      });
      updateStudioJob(job.id, {
        finishedAt: new Date().toISOString(),
        status: "passed",
        step: "completed"
      });
    } catch (error) {
      updateStudioJob(job.id, {
        error: error instanceof Error ? error.message : String(error),
        finishedAt: new Date().toISOString(),
        status: "failed"
      });
    }
  });

  return job;
}

export function getStudioJob(id) {
  return jobs.get(id) ?? null;
}

function updateStudioJob(id, updates) {
  const job = jobs.get(id);

  if (!job) {
    return;
  }

  jobs.set(id, {
    ...job,
    ...updates,
    updatedAt: new Date().toISOString()
  });
}
