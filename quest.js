import { sha256Hex, ANSWER_HASH } from "./hash.js";
import { makeBinaryRiddle } from "./gen.js";

const FLAG = "school_fire_started"
const COOKIE_NAME = "sid";
const COOKIE_VALUE = "codec=utf8;bits=8;scan:storage;groups=8;k=v_*";

function genStorageKey() {
    return "v_" + Math.random().toString(36).slice(2, 10);
}

function banner() {
    const t1 = "⬢ DevTools Quest — Binary";
    const t2 = "Говори с браузером. Волшебные слова ты уже слышал 😉";
    console.log("%c" + t1, "color:#b9a8ff;font-weight:800;font-size:18px");
    console.log("%c" + t2, "color:#9cc6ff;font-size:13px");
}

function eat(phrase) {
    const ok = String(phrase || "").trim().toLowerCase() === "поешь печеньков";
    if (!ok) {
        console.log("%cХмм... не то заклинание.", "color:#fca5a5");
        return;
    }

    const seed = new URLSearchParams(location.search).get("event") || "school";
    const storageKey = genStorageKey();
    try {
        localStorage.setItem(storageKey, makeBinaryRiddle(seed));
    } catch (e) {}

    document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; path=/; samesite=Lax; max-age=3600`;

    console.log("%cПеченьки приняты. Поищи следы: заголовки, cookie, хранилища.", "color:#22c55e");
    console.log("%cИногда группы по 8 рассказывают больше, чем текст.", "color:#cbd5ff");
    setTimeout(() => {
        console.log("%cЕсли совсем темно: в кладовой часто лежат вещи на «v_».", "color:#94f0c4;font-size:12px");
    }, 1500);
}

async function answer(input) {
    const el = document.getElementById("flag");
    const hash = await sha256Hex(input);
    if (hash === ANSWER_HASH) {
        el.style.display = "block";
        el.innerHTML =
            "✅ Верно! Твой флаг: <strong>" +
            FLAG +
            "</strong><br>Пришли его мне в Telegram: " +
            "<a href='https://t.me/become_undefined' target='_blank'>@become_undefined</a> или " +
            "<a href='https://t.me/awicone' target='_blank'>@awicone</a> — и забери приз 🎁";
        console.log("%cПоздравляю! Флаг: %c" + FLAG, "color:#22c55e", "background:#111;padding:2px 6px;border-radius:6px;color:#bbf7d0");
    } else {
        console.log("%cПока мимо. Прислушайся — иногда ответ отзывается сам.", "color:#fca5a5");
    }
}

window.quest = { eat, answer };

banner();
