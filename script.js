function analyzeNews() {
    const text = document.getElementById("newsInput").value.trim();
    const result = document.getElementById("result");

    if (text.length < 20) {
        result.innerHTML = "⚠️ Please enter a longer news text.";
        return;
    }

    // Flags
    let score = 0;
    let redFlags = [];

    // 1️⃣ Impossible science claims
    const impossiblePatterns = [
        /emit.*wifi/i,
        /glow(s)? in the dark/i,
        /produce.*internet/i,
        /gain.*superpower/i,
        /magically/i,
        /teleport/i,
        /time travel/i,
        /sunlight.*creates/i
    ];
    impossiblePatterns.forEach(pattern => {
        if (pattern.test(text)) {
            score += 40;
            redFlags.push("Impossible or pseudo-scientific claim");
        }
    });

    // 2️⃣ Missing source or vague authority
    const trustedSources = [
        "Reuters", "BBC", "The Hindu", "Indian Express",
        "Times of India", "NDTV", "Press Information Bureau",
    ];
    const hasTrustedSource = trustedSources.some(src => text.includes(src));
    if (!hasTrustedSource) {
        score += 20;
        redFlags.push("No trusted or verifiable source mentioned");
    }

    // 3️⃣ Sensational keywords
    const sensationalWords = [
        /shocking/i,
        /unbelievable/i,
        /miracle/i,
        /breaking news/i,
        /never seen before/i,
        /secretly/i
    ];
    sensationalWords.forEach(pattern => {
        if (pattern.test(text)) {
            score += 15;
            redFlags.push("Sensational or exaggerated language");
        }
    });

    // 4️⃣ Fake institutes or vague organizations
    const fakeInstitutePatterns = [
        /International Space Biology Institute/i,
        /Global Federation of Truth/i,
        /World Science Council/i
    ];
    fakeInstitutePatterns.forEach(pattern => {
        if (pattern.test(text)) {
            score += 25;
            redFlags.push("Organisation sounds fake or unverifiable");
        }
    });

    // 5️⃣ Missing date or timeline
    if (!/\d{4}/.test(text) && !/(today|yesterday|last week|this year)/i.test(text)) {
        score += 10;
        redFlags.push("No date or timeline");
    }

    // 6️⃣ Too "perfect" structured but unrealistic
    if (text.split(" ").length < 50) {
        score += 5;
        redFlags.push("Short structured text can be suspicious");
    }

    // Final decision
    if (score >= 40) {
        result.innerHTML = `
            ❌ <b>This news is likely FAKE.</b><br><br>
            🔍 <b>Reasons:</b><br> - ${redFlags.join("<br> - ")}
        `;
    } else if (score >= 20) {
        result.innerHTML = `
            ⚠️ <b>This news is suspicious.</b><br><br>
            🔍 <b>Reasons:</b><br> - ${redFlags.join("<br> - ")}
        `;
    } else {
        result.innerHTML = `
            ✅ <b>This news appears to be REAL (based on rule-based checks).</b>
        `;
    }
}
