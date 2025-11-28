function analyzeNews() {
    const text = document.getElementById("newsInput").value.trim();
    const result = document.getElementById("result");

    if (text.length < 20) {
        result.innerHTML = "⚠️ Please enter a longer news text.";
        return;
    }

    let score = 0;
    let redFlags = [];

    // 1️⃣ Impossible / pseudo-scientific claims
    const impossiblePatterns = [
        /emit.*wifi/i,
        /glow(s)? in the dark/i,
        /produce.*internet/i,
        /gain.*superpower/i,
        /magically/i,
        /teleport/i,
        /time travel/i,
        /sunlight.*creates/i,
        /bio-?fluorescent/i,
        /mixed.*with.*algae/i
    ];
    impossiblePatterns.forEach(pattern => {
        if (pattern.test(text)) {
            score += 40;
            redFlags.push("Impossible or pseudo-scientific claim");
        }
    });

    // 2️⃣ Missing trusted source (news agency, govt link, etc.)
    const trustedSources = [
        "Reuters", "BBC", "The Hindu", "Indian Express", "Times of India",
        "NDTV", "Hindustan Times", "Press Information Bureau", "PIB",
        "All India Radio", "Economic Times"
    ];
    const hasTrustedSource = trustedSources.some(src => text.includes(src));
    if (!hasTrustedSource) {
        score += 20;
        redFlags.push("No trusted or verifiable source mentioned");
    }

    // 3️⃣ Sensational language (common in fake viral posts)
    const sensationalWords = [
        /shocking/i,
        /unbelievable/i,
        /miracle/i,
        /breaking news/i,
        /never seen before/i,
        /secretly/i,
        /viral/i,
        /explosive/i
    ];
    sensationalWords.forEach(pattern => {
        if (pattern.test(text)) {
            score += 15;
            redFlags.push("Sensational or exaggerated language");
        }
    });

    // 4️⃣ Fake-sounding institutes
    const fakeInstitutes = [
        /International Space Biology Institute/i,
        /Global Federation of Truth/i,
        /World Science Council/i,
        /Universal Agriculture Research Board/i,
        /National Tomato Innovation Center/i
    ];
    fakeInstitutes.forEach(pattern => {
        if (pattern.test(text)) {
            score += 25;
            redFlags.push("Suspicious or unverifiable organisation name");
        }
    });

    // 5️⃣ Check for lack of timeline or date
    if (!/\d{4}/.test(text) && !/(today|yesterday|last week|this year|recently)/i.test(text)) {
        score += 10;
        redFlags.push("No verifiable date or timeline included");
    }

    // 6️⃣ Very short structured text could be suspicious
    if (text.split(" ").length < 50) {
        score += 5;
        redFlags.push("Short structured text (may be artificially generated)");
    }

    // 📌 FINAL DECISION BASED ON SCORE
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
