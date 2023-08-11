import request from "./index";
import SSE from "@/utils/sse";
export function test() {
  return new SSE("/index.php/event/event-stream", {
    method: "POST",
  });
}
