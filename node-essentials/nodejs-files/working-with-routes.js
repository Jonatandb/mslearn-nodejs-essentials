const fs = require('fs').promises
const path = require('path')

async function findSalesFiles(folderName) {
  let salesFiles = []

  async function findFiles(folderName) {
    const items = await fs.readdir(folderName, { withFileTypes: true })

    for (item of items) {
      if (item.isDirectory()) {
        await findFiles(path.join(folderName, item.name))
      } else {
        if (path.extname(item.name) === '.json') {
          salesFiles.push(path.join(folderName, item.name))
        }
      }
    }
  }

  await findFiles(folderName)

  return salesFiles
}

async function main() {
  const salesDir = path.join(__dirname, 'stores')

  const salesFiles = await findSalesFiles(salesDir)
  console.log(salesFiles)
}

main()
