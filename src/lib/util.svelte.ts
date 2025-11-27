import { writable, type Unsubscriber, type Writable } from "svelte/store";

export function oklchToRGB(oklch: string): {r: number, g: number, b: number} {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = oklch;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return {r: r, g: g, b: b};
}

export function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}
export function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
}

export function shakeById(id: string) {
    const el : any = document.getElementById(id);
    if (el) {
      el.classList.remove("shake");
      void el.offsetWidth;
      el.classList.add("shake");
    }
}

export function parseJwt (token : string) : any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}


export function timeAgo(ms: number) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(months / 12);
    return `${years}y ago`;
}

export function formatTimestamp(ms: number) {
    new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(ms).replace(',', ' at');
}


const WRITABLE_STORE : Map<string, Writable<any>> = new Map();

export function subscribeLocalState<T>(key: string, fn: (value: T) => void): Unsubscriber | null {
    const store = WRITABLE_STORE.get(key);
    if (!store) return null;
    return store.subscribe(fn);
}

export function getLocalState<T>(key: string): Writable<T> | null {
    const store = WRITABLE_STORE.get(key);
    if (!store) return null;
    return store;
}

export function localState<T>(key: string, defaultValue: T): Writable<T> {
    if (WRITABLE_STORE.has(key)) return WRITABLE_STORE.get(key) as Writable<T>;

    const stored = localStorage.getItem(key);
    console.log(`[LOCAL STATE] READ ${key} : ${stored}`);

    let parsed: T;
    if (stored && stored !== "undefined") {
        parsed = JSON.parse(stored);
    } else {
        parsed = defaultValue;
    }

    const w = writable<T>(parsed);
    w.subscribe(value => {
        console.log(`[LOCAL STATE] SET ${key} : ${value}`);
        localStorage.setItem(key, JSON.stringify(value));
    });

    WRITABLE_STORE.set(key, w);
    return w;
}

export const prettify = (t: String) => {
    return t.replaceAll("_", " ").split(" ").map((s) => s[0].toUpperCase() + s.slice(1)).join(" "); 
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}


type BestGrid = {
        cols: number;
        rows: number;
        tileWidth: number;
        tileHeight: number;
        usedArea: number;  
        fillFraction: number; 
    };

export function best_grid(A: number, B: number, C: number): BestGrid | null {
    if (!(A > 0 && B > 0 && C >= 1 && Number.isFinite(A) && Number.isFinite(B))) {
        return null
    }

    const W = A;
    const H = 1;

    let best: BestGrid | null = null;

    for (let cols = 1; cols <= C; cols++) {
        const rows = Math.ceil(C / cols);
        const th = Math.min(H / rows, W / (B * cols));
        const tw = B * th;
        const usedArea = C * tw * th;
        const fillFraction = usedArea / (W * H);
        if (best === null || usedArea > best.usedArea) {
        best = { cols, rows, tileWidth: tw, tileHeight: th, usedArea, fillFraction };
        }
    }

    return best!;
}



export type Vec2 = {x: number, y: number};
export const vec2 = (x: number, y: number): Vec2 => ({x, y});
export const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: Vec2, b: number): Vec2 => ({ x: a.x * b, y: a.y * b });
export const div = (a: Vec2, b: number): Vec2 => ({ x: a.x / b, y: a.y / b });
export const e2pos = (e: MouseEvent): Vec2 => ({ x: e.clientX, y: e.clientY });
export const length_squared = (v: Vec2): number => v.x * v.x + v.y * v.y;
export const length = (v: Vec2): number => Math.sqrt(length_squared(v));
export const is_zero = (v: Vec2): boolean => v.x == 0 && v.y == 0;
export const normalize = (v: Vec2): Vec2 => {let l = length(v); return div(v, l)};
export const normalize_or_zero = (v: Vec2): Vec2 => {let l = length(v); return l == 0 ? vec2(0, 0) : div(v, l)};
export const move_towards = (a: number, b: number, speed: number): number => Math.min(Math.max(a, b), a + (b - a) * speed);