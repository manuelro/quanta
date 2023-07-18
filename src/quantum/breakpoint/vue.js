import Quanta from '../../core/quanta.js'
import { ref, onMounted, onUnmounted } from 'vue'

export default function(breakpointKey) {
    const config = ref(Quanta.tailwindConfig)
    const theme = config.value.theme
    const breakpoints = theme.screens
    const matches = ref(false)
    let mql

    const handler = (e) => {
        if (e.matches) {
            matches.value = true
        } else {
            matches.value = false
        }
    }

    onMounted(() => {
        mql = window.matchMedia(`(min-width: ${breakpoints[breakpointKey]})`)
        mql.addEventListener('change', handler)
        matches.value = mql.matches
    })

    onUnmounted(() => {
        mql && mql.removeListener(handler)
    })

    const capitalizedKey = breakpointKey[0]?.toUpperCase() + breakpointKey?.substring(1)
    return {
        [`is${capitalizedKey}`]: matches,
    }
}
