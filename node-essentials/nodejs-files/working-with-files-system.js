const fs = require('fs').promises

async function findSalesFiles(folderName) {
  let salesFiles = []

  async function findFiles(folderName) {
    const items = await fs.readdir(folderName, { withFileTypes: true })
    for (item of items) {
      if (item.isDirectory()) {
        await findFiles(`${folderName}/${item.name}`)
      } else {
        if (item.name === 'sales.json') {
          salesFiles.push(`${folderName}/${item.name}`)
        }
      }
    }
  }

  await findFiles(folderName)

  return salesFiles
}

async function main() {
  const salesFiles = await findSalesFiles('stores')
  console.log(salesFiles)
}

main()
