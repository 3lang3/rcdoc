import context from "./context";

export function signit() {
  process.once('SIGINT', () => {
    context?.server?.close()
    context?.closes.forEach(close => close())
  })
}