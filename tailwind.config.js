module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBlack: "#0c0f12"
            },
            fontFamily: {
                playfair: "Playfair Display"
            },
            transitionProperty: {
                "border": "border-color"
            }
        }
    },
    plugins: [
        require("@tailwindcss/line-clamp")
    ]
}
