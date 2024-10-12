export const invertTheme = ({colors, colorsInvert, global}) => ({
    colors: colorsInvert,
    colorsInvert: colors,
    global
})

const colors = {
    primary: '#000000',
    secondary: '#000000',
    lightBackground: '#ffffff',
    darkBackground: '#000000',
    foreground: '#000000',
    lightText: '#ffffff',
    darkText: '#000000',
    greyLightText: '#aaaaaa',
    greyDarkText: '#787878',
    borderLight: '#dddddd'
}

const fonts = {
    primaryFont: `Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
}

const Theme = {
    colors: {
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
        backgroundColor: colors.lightBackground,
        lightText: colors.lightText,
        darkText: colors.darkText,
        greyLightText: colors.greyLightText,
        borderColor: colors.borderLight,
        greyDarkText: '#787878'
    },

    colorsInvert: {
        primaryColor: colors.primary,
        secondaryColor: colors.lightText,
        backgroundColor: colors.darkBackground,
        lightText: colors.darkText,
        darkText: colors.lightText
    },

    primaryFont: fonts.primaryFont,
    sectionPadding: "32px 24px 48px 24px",
    cardPadding: "16px 16px 24px 16px",
    cardBorder: "1px solid #dddddd",
    cardShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    maxTextWidth: "800px",
    subheadingLineHeight: "1.3",
    borderStyle: "2px solid #ddd",
    horizontalNavStyles: "display: flex; flex-direction: column"
}


export default Theme