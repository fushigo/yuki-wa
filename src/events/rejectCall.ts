import { WACallEvent, WASocket } from "baileys";

export default async function eventRejectCall(
  callMessage: WACallEvent[],
  sock: WASocket
) {
  await sock.rejectCall(callMessage[0].id, callMessage[0].from);
  return;
}
