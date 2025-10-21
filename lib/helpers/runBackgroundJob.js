/**
 * Run a background job safely (non-blocking).
 * Automatically retries once on failure.
 *
 * @param {string} jobName - Name for logging and identification.
 * @param {Function} fn - Async function representing the background job.
 * @param {number} [retryDelayMs=3000] - Delay before retry (in ms).
 */

const shouldRetry = (error) => {
  return !(error?.status === 429 || error?.name === "RateLimitError");
};

export const runBackgroundJob = async (jobName, fn, retryDelayMs = 3000) => {
  // Fire-and-forget
  setImmediate(async () => {
    try {
      console.log(`🚀 Starting background job: ${jobName}`);
      await fn();
      console.log(`✅ Completed background job: ${jobName}`);
    } catch (error) {
      console.error(`❌ Job "${jobName}" failed: ${error.message}`);

      if (!shouldRetry(error)) {
        console.warn(`⚠️ Not retrying "${jobName}" due to error type.`);
        return;
      }

      console.log(`⏳ Retrying "${jobName}" in ${retryDelayMs / 1000}s...`);

      // Retry once after short delay
      setTimeout(async () => {
        try {
          await fn();
          console.log(`✅ Retry succeeded for job: ${jobName}`);
        } catch (retryError) {
          if (!shouldRetry(retryError)) {
            console.warn(`⚠️ Retry failed for "${jobName}" due to error type.`);
            return;
          }

          console.error(`💥 Retry failed for job "${jobName}":`, retryError);
        }
      }, retryDelayMs);
    }
  });
};
