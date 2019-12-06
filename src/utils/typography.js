import Typography from "typography"
import moragaTheme from "typography-theme-moraga"
moragaTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'a': {
      textShadow: 'none',
      backgroundImage: 'none',
    }
  })

const typography = new Typography(moragaTheme)

export const { scale, rhythm, options } = typography
export default typography