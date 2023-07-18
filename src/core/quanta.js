import resolveConfig from 'tailwindcss/resolveConfig'

class Quanta {
    tailwindConfig
    framework

    setTailwindConfig(config){
        this.tailwindConfig = resolveConfig(config)
    }

    setFramework(framework){
        this.framework = framework ?? 'react'
    }
}

export default new Quanta()