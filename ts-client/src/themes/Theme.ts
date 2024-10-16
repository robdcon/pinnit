const colors = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    lightBackground: 'var(--color-light-background)',
    darkBackground: 'var(--color-dark-background)',
    foreground: 'var(--color-foreground)',
    lightText: 'var(--color-light-text)',
    darkText: 'var(--color-dark-text)',
    greyLightText: 'var(--color-grey-light-text)',
    greyDarkText: 'var(--color-grey-dark-text)',
    borderLight: 'var(--color-border-light)',
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

    spacing: {
        xxs: 'var(--spacing-xxs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        xxl: 'var(--spacing-xxl)',
    },

    fonts: {
        primaryFont: fonts.primaryFont,
        fontSizeSm: 'var(--font-size-sm)',
        fontSizeMd: 'var(--font-size-md)',
        fontSizeLg: 'var(--font-size-lg)',
        fontSizeXl: 'var(--font-size-xl)',
        fontSizeXxl: 'var(--font-size-xxl)',
        fontWeightLight: 'var(--font-weight-light)',
        fontWeightNormal: 'var(--font-weight-normal)',
        fontWeightBold: 'var(--font-weight-bold)',
        fontWeightBolder: 'var(--font-weight-bolder)',
    }
}

export default Theme