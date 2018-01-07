import jss from 'jss'
import preset from 'jss-preset-default'
import {
  compose,
  lifecycle,
  setDisplayName,
  withPropsOnChange,
} from 'recompose'

jss.setup(
  preset({
    defaultUnit: {
      'line-height': 'px',
    },
  }),
)

export function withStyles(styles) {
  return Component => {
    const displayName = `JSS(${Component.displayName ||
    Component.name /* istanbul ignore next */ ||
      'Component'})`
    const styleSheet = jss.createStyleSheet(styles)
    let instances = 0
    return compose(
      setDisplayName(displayName),
      lifecycle({
        componentWillMount() {
          /* istanbul ignore else */
          if (!instances++) {
            styleSheet.attach()
          }
        },
        componentWillUnmount() {
          /* istanbul ignore else */
          if (!--instances) {
            styleSheet.detach()
          }
        },
      }),
      withPropsOnChange(['classes'], ({ classes }) => ({
        classes:
          classes == null
            ? styleSheet.classes
            : { ...classes, ...styleSheet.classes },
      })),
    )(Component)
  }
}
