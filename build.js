const fs = require('fs-extra')

const dir = './dist'
const desiredMode = 0o2775
const options = {
  mode: 0o2775
}

fs.ensureDir(dir, err => {
  if( err ) return
  fs.emptyDirSync(dir)
  fs.copySync('./src', `${dir}`)
  fs.copySync('./package.json', `${dir}/package.json`)
})