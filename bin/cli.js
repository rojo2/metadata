const metadata = require('@rojo2/metadata')

const [,,url, agent] = process.argv
if (!url) {
  console.log('metadata <url>')
  process.exit(1)
  return
}

metadata.get(url, agent).then((data) => {
  console.log(JSON.stringify(data, null, 2))
  process.exit(0)
})
