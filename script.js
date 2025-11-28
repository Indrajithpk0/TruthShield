function analyzeFakeNews(text) {
    // Temporary mock logic
    if (text.length < 20) {
        return "Please enter a longer news text to analyze.";
    }

    // Simple keyword-based test (temporary)
    if (text.includes("FREE MONEY") || text.includes("click here") || text.includes("shocking")) {
        return "⚠️ This news looks suspicious. Likely FAKE.";
    }

    return "✅ This news appears to be REAL (based on basic checks).";
}

document.getElementById("checkBtn").addEventListener("click", () => {
    const text = document.getElementById("newsInput").value;
    const result = analyzeFakeNews(text);

    document.getElementById("resultText").innerText = result;
    document.getElementById("resultBox").classList.remove("hidden");
});
