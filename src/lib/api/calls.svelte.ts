// ----------------------
// Request types (Client → Server)

import { PUBLIC_API_BASE } from "$env/static/public";

// ----------------------
export type ClientRequests =
  | { type: "leave" }
  | { type: "join"; room_guid: string; password?: string }
  | { type: "create"; name: string; private?: boolean; password?: string }
  | { type: "message"; msg: string }
  | { type: "pong" };

// ----------------------
// Event types (Server → Client)
// ----------------------
export type CallEvent =
  | { type: "room_join"; user: User; room_guid: string }
  | { type: "room_leave"; user: User; room_guid: string }
  | { type: "room_created"; user: User; room: PublicRoomRecord }
  | { type: "room_deleted"; room_guid: string }
  | { type: "message"; msg: string }
  | { type: "ping" }
  | { type: "error"; msg: string }
  | { type: "guest", name: string; guid: string};

// ----------------------
// Supporting types
// ----------------------
export type User = 
| {type: "guest", guid: string, name: string}
| {type: "logged", guid: string}

export interface PublicRoomRecord {
    guid: string;
    name: string;
    private: boolean;
    owner: User,
    creator: User,
    created: number,
    users: Record<string, User>,
    secure: boolean,
}

// ----------------------
// WebSocket helpers
// ----------------------
export class CallSocket {
  private ws: WebSocket;
  private listeners: { [K in CallEvent["type"]]?: ((ev: Extract<CallEvent, { type: K }>) => void)[] } = {};

  constructor(url: string) {
    this.ws = new WebSocket(url);

    this.ws.addEventListener("message", (ev) => {
      try {
        const data: CallEvent = JSON.parse(ev.data);
        this.listeners[data.type]?.forEach((fn) => fn(data as any));
      } catch (e) {
        console.error("Invalid WS message", e);
      }
    });
  }

  // Connect and await open
  static async connect(url: string): Promise<CallSocket> {
    return new Promise((resolve, reject) => {
      const cs = new CallSocket(url);
      cs.ws.addEventListener("open", () => resolve(cs));
      cs.ws.addEventListener("error", reject);
    });
  }

  // Send request
  send(req: ClientRequests) {
    this.ws.send(JSON.stringify(req));
  }

  // Typed event listener
  on<T extends CallEvent["type"]>(type: T, handler: (ev: Extract<CallEvent, { type: T }>) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type]!.push(handler);
  }

  close(code?: number, reason?: string) {
    this.ws.close(code, reason);
  }

  // ----------------------
  // Specific request helpers
  // ----------------------
  leave() {
    this.send({ type: "leave" });
  }

  join(room_guid: string, password?: string) {
    console.log("Joining room", room_guid)
    this.send({ type: "join", room_guid, password });
  }

  create(name: string, privateRoom?: boolean, password?: string) {
    this.send({ type: "create", name, private: privateRoom, password });
  }

  message(msg: string) {
    this.send({ type: "message", msg });
  }

  pong() {
    this.send({ type: "pong" });
  }
}



export let calls_socket : null | CallSocket = null;

export async function init_calls(t: {name?: string, token?: string}){
    if (calls_socket) return;
    if (t.name) {
        calls_socket = await CallSocket.connect(PUBLIC_API_BASE + "/api/calls?guest=" + t.name );
    }
    else if (t.token) {
        calls_socket = await CallSocket.connect(PUBLIC_API_BASE + "/api/calls?token=" + t.token );
    } else {return}
    console.log("Connected!")
    calls_socket.on("guest", (j) => {
        console.log("Guest", j)
    })
    calls_socket.on("ping", () => {
        calls_socket?.pong();
    })
}



export async function get_rooms() : Promise<PublicRoomRecord[]> {
    try {
        console.log("req")
        const res = await fetch(`${PUBLIC_API_BASE}/api/calls/rooms`);
        if (!res.ok) return []
        let j = await res.json();
        console.log("Rooms", j)
        return j;
    } catch {}
    return []
}