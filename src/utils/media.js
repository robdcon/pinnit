import {css} from 'styled-components'

export const media =
{
	handheld: (...args) => css`

		@media (min-width:600px)
		{
			${css(...args)}
		}

	`,
	tablet: (...args) => css`

		@media (min-width:800px)
		{
			${css(...args)}
		}

	`,
	desktop: (...args) => css`

		@media (min-width:960px)
		{
			${css(...args)}
		}

	`,
	retina: (...args) => css`
	
		@media (min-width:1980px)
		{
			${css(...args)}
		}
	
	`
}

//USAGE:
//import {media} from '../utils/media
//${media.handheld`width:100%;`}