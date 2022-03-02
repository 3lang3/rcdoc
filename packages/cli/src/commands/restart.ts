import { spawn } from 'child_process';

export function restart() {
  if (process.env.process_restarting) {
    delete process.env.process_restarting;
    // Give old process one second to shut down before continuing ...
    setTimeout(restart, 1000);
    return;
  }

  // Restart process ...
  spawn(process.argv[0], process.argv.slice(1), {
    env: { process_restarting: '1' },
    stdio: 'ignore'
  }).unref();
}
