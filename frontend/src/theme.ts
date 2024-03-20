

export const tokens = {
    grey: {
        100: "#e7f3fb",
        200: "#cee6f6",
        300: "#f2f7fa",
        400: "#fafafb",
        500: "#85c1e9",
        600: "#6a9aba",
        700: "#fafafb",
        800: "#354d5d",
        900: "#1b272f"
    },
    primary: {
        100: "#f6fdfc",
        200: "#ecfbfa",
        300: "#e3f8f7",
        400: "#d9f6f5",
        500: "#d0f4f2",
        600: "#a6c3c2",
        700: "#7d9291",
        800: "#536261",
        900: "#2a3130"
    
    },
    secondary: {
        
        100: "#fefcf8",
        200: "#fef9f1",
        300: "#fdf6eb",
        400: "#fdf3e4",
        500: "#fcf0dd",
        600: "#cac0b1",
        700: "#979085",
        800: "#656058",
        900: "#32302c"

    },
    tertiary: {
        500: "#8884d8"
    },
    background: {
        light: "#2d2d34",
        main: "#1f2026"
    },
};


export const themeSettings = {
    palette: {
        primary: {
            ...tokens.primary,
            main: tokens.primary[500],
            light: tokens.primary[400]
        },
        secondary:{
            ...tokens.secondary,
            main: tokens.secondary[500]
        },
        tertiary: {
            ...tokens.tertiary,
        },
        grey: {
            ...tokens.grey,
            main: tokens.grey[500]
        },
        background: {
            default: tokens.background.main,
            light: tokens.background.light
        },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 32,
        },
        h2:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h3:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
            fontWeight: 800,
            color: tokens.grey[200]
        },
        h4:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
            fontWeight: 600,
            color: tokens.grey[300]
        },
        h5:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            fontWeight: 400,
            color: tokens.grey[500]
        },
        h6:{
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 10,
            fontWeight: 200,
            color: tokens.grey[700]
        }
    }
};
