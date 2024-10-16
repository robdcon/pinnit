import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primaryColor: string,
            secondaryColor: string,
            backgroundColor: string,
            lightText: string,
            darkText: string,
            greyLightText: string,
            borderColor: string,
            greyDarkText: string,
        },
        spacing: {
            xxs: string,
            xs: string,
            sm: string,
            md: string,
            lg: string,
            xl: string,
            xxl: string,
        },
        fonts: {
            primaryFont: string,
            fontSizeSm: string,
            fontSizeMd: string,
            fontSizeLg: string,
            fontSizeXl: string,
            fontSizeXxl: string,
            fontWeightLight: string,
            fontWeightNormal: string,
            fontWeightBold: string,
            fontWeightBolder: string,
        }
    }
}