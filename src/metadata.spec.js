import cheerio from 'cheerio'
import metadata from './metadata'

describe('Metadata', () => {
  it('should extract canonical URL', () => {
    const $ = cheerio.load('<html><head><link rel="canonical" href="canonical-url"></head><body></body></html>')
    expect(metadata.getCanonicalURL($)).to.be.equal('canonical-url')
  })
  it('should extract previous URL', () => {
    const $ = cheerio.load('<html><head><link rel="prev" href="previous-url"></head><body></body></html>')
    expect(metadata.getPreviousURL($)).to.be.equal('previous-url')
  })
  it('should extract next URL', () => {
    const $ = cheerio.load('<html><head><link rel="next" href="next-url"></head><body></body></html>')
    expect(metadata.getNextURL($)).to.be.equal('next-url')
  })
  it('should extract title', () => {
    const $ = cheerio.load('<html><head><title>Title</title></head><body></body></html>')
    expect(metadata.getTitle($)).to.be.equal('Title')
  })
  it('should extract meta tags', () => {
    const $ = cheerio.load('<html><head><meta name="author" content="Author"><meta name="keywords" content="Keywords"><meta name="description" content="Description"><meta name="generator" content="Generator"><meta name="application-name" content="AppName"><meta name="viewport" content="Viewport"><meta name="robots" content="Robots"><meta name="copyright" content="Copyright"></head><body></body></html>')
    expect(metadata.getMetaData($)).to.be.deep.equal({
      author: 'Author',
      keywords: 'Keywords',
      generator: 'Generator',
      description: 'Description',
      applicationName: 'AppName',
      viewport: 'Viewport',
      robots: 'Robots',
      copyright: 'Copyright'
    })
  })
  it('should extract open graph data', () => {
    const $ = cheerio.load('<html><head><meta property="og:url" content="URL"><meta property="og:title" content="Title"><meta property="og:description" content="Description"><meta property="og:image" content="Image"><meta property="og:type" content="product"></head><body></body></html>')
    expect(metadata.getOpenGraphData($)).to.be.deep.equal({
      url: 'URL',
      title: 'Title',
      description: 'Description',
      image: 'Image',
      type: 'product'
    })
  })
  it('should extract linked data', () => {
    const $ = cheerio.load('<html><head></head><body><script type="application/ld+json">{"@context": "context","title": "Title"}</script></html>')
    expect(metadata.getLinkedData($)).to.be.deep.equal({
      '@context': 'context',
      'title': 'Title'
    })
  })
  it('should extract twitter data', () => {
    // TODO: 
  })
})
