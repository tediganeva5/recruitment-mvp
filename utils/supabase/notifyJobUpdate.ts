import { createClient } from "./server";

export async function notifyJobStatusChange(jobId: string, status: string) {
  const supabase = await createClient();

  try {
    await supabase.channel("job-status").send({
      type: "broadcast",
      event: "status-changed",
      payload: { jobId, status },
    });
    console.log(`Notified Supabase of job ${jobId} status change to ${status}`);
  } catch (err) {
    console.error("Failed to notify Supabase of job status change:", err);
  }
}
