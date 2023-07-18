import Quanta from '../../core/quanta'
import { useMediaQuery } from 'react-responsive'

const { theme } = Quanta.tailwindConfig
const breakpoints = theme.screens || []

export default function(breakpointKey) {
    const bool = useMediaQuery({
        query: `(min-width: ${breakpoints[breakpointKey]})`,
    })
    const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1)
    return {
        [`is${capitalizedKey}`]: bool,
    }
}
