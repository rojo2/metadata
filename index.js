const axios = require('axios')
const cheerio = require('cheerio')

/**
 * Returns the canonical URL
 * @param {cheerio}
 * @returns {string}
 */
function getCanonicalURL($) {
  return $('link[rel="canonical"]').attr('href')
}

/**
 * Returns the prev URL
 * @param {cheerio}
 * @returns {string}
 */
function getPreviousURL($) {
  return $('link[rel="prev"]').attr('href')
}

/**
 * Returns the next URL
 * @param {cheerio}
 * @returns {string}
 */
function getNextURL($) {
  return $('link[rel="next"]').attr('href')
}

/**
 * Returns the title
 * @param {cheerio}
 * @returns {string}
 */
function getTitle($) {
  return $('title').text()
}

/**
 * Returns the page metadata
 * @param {cheerio}
 * @returns {object|null}
 */
function getMetaData($) {
  const author = $('meta[name="author"]').attr('content')
      , keywords = $('meta[name="keywords"]').attr('content')
      , description = $('meta[name="description"]').attr('content')
      , generator = $('meta[name="generator"]').attr('content')
      , applicationName = $('meta[name="application-name"]').attr('content')
      , viewport = $('meta[name="viewport"]').attr('content')
      , robots = $('meta[name="robots"]').attr('content')
      , copyright = $('meta[name="copyright"]').attr('content')
  if (author || keywords || description || generator || applicationName || viewport || robots || copyright) {
    return { keywords, description, generator, applicationName, viewport, robots, copyright }
  }
  return null
}

/**
 * Returns the twitter creator data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterCreatorData($) {
  const value = $('meta[name="twitter:creator"]').attr('content')
      , id =  $('meta[name="twitter:creator:id"]').attr('content')
  if (value || id) {
    return { value, id }
  }
  return null
}

/**
 * Returns the twitter site data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterSiteData($) {
  const value = $('meta[name="twitter:site"]').attr('content')
      , id =  $('meta[name="twitter:site:id"]').attr('content')
  if (value || id) {
    return { value, id }
  }
  return null
}

/**
 * Returns the twitter image data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterImageData($) {
  const url = $('meta[name="twitter:image"]').attr('content')
      , alt = $('meta[name="twitter:image:alt"]').attr('content')
  if (url || alt) {
    return { url, alt }
  }
  return null
}

/**
 * Returns the twitter player data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterPlayerData($) {
  const url = $('meta[name="twitter:player"]').attr('content')
      , width = $('meta[name="twitter:player:width"]').attr('content')
      , height = $('meta[name="twitter:player:height"]').attr('content')
      , stream = $('meta[name="twitter:player:stream"]').attr('content')
  if (url || width || height || stream) {
    return { url, width, height, stream }
  }
  return null
}

/**
 * Returns the twitter app iphone data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterAppIPhoneData($) {
  const name = $('meta[name="twitter:app:name:iphone"]').attr('content')
      , id = $('meta[name="twitter:app:id:iphone"]').attr('content')
      , url = $('meta[name="twitter:app:url:iphone"]').attr('content')
  if (name || id || url) {
    return { name, id, url }
  }
  return null
}

/**
 * Returns the twitter app ipad data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterAppIPadData($) {
  const name = $('meta[name="twitter:app:name:ipad"]').attr('content')
      , id = $('meta[name="twitter:app:id:ipad"]').attr('content')
      , url = $('meta[name="twitter:app:url:ipad"]').attr('content')
  if (name || id || url) {
    return { name, id, url }
  }
  return null
}

/**
 * Returns the twitter app googleplay data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterAppGooglePlayData($) {
  const name = $('meta[name="twitter:app:name:googleplay"]').attr('content')
      , id = $('meta[name="twitter:app:id:googleplay"]').attr('content')
      , url = $('meta[name="twitter:app:url:googleplay"]').attr('content')
  if (name || id || url) {
    return { name, id, url }
  }
  return null
}

/**
 * Returns the twitter app data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterAppData($) {
  const iPhone = getTwitterAppIPhoneData($)
      , iPad = getTwitterAppIPadData($)
      , googlePlay = getTwitterAppGooglePlayData($)
  if (iPhone || iPad || googlePlay) {
    return {
      iPhone,
      iPad,
      googlePlay
    }
  }
  return null
}

/**
 * Returns the twitter data
 * @param {cheerio}
 * @returns {object|null}
 */
function getTwitterData($) {
  const card = $('meta[name="twitter:card"]').attr('content') 
      , title = $('meta[name="twitter:title"]').attr('content')
      , description = $('meta[name="twitter:description"]').attr('content')
      , creator = getTwitterCreatorData($)
      , site = getTwitterSiteData($)
      , image = getTwitterImageData($) 
      , player = getTwitterPlayerData($)
      , app = getTwitterAppData($)

  if (card || title || description || creator || site || image || player || app) {
    return { card, title, description, creator, site, image, player, app }
  }
  return null
}

/**
 * Returns the open graph data
 * @param {cheerio}
 * @returns {object|null}
 */
function getOpenGraphData($) {
  const url = $('meta[property="og:url"]').attr('content')
      , title = $('meta[property="og:title"]').attr('content')
      , description = $('meta[property="og:description"]').attr('content')
      , image = $('meta[property="og:image"]').attr('content')
      , type = $('meta[property="og:type"]').attr('content')
  if (url || image || description || image || type) {
    return { url, image, description, image, type }
  }
  return null
}

/**
 * Returns the linked data
 * @param {cheerio}
 * @returns {object|null}
 */
function getLinkedData($) {
  const tag = $('script[type="application/ld+json"]')
  if (tag.length) {
    try {
      const text = tag.html()
      return JSON.parse(text)
    } catch (error) {
      return null
    }
  }
  return null
}

/**
 * Returns a User-Agent header based on an agent name.
 * @param {string} userAgent
 * @returns {string}
 */
function getUserAgent(userAgent) {
  switch (userAgent) {
    default:
    case 'googlebot':
      return 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36'
    case 'bingbot':
      return 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
    case 'chromium':
      return 'Mozilla/5.0 (Linux x86_64) AppleWebKit/540.36 (KHTML, like Gecko) Ubuntu Chromium/75.0.3359.181 Chrome/75.0.3359.181 Safari/540.36'
    case 'chrome':
      return 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) UR/65.4.3163.35 Chrome/77.9.3239.84 Safari/537.36'
    case 'ie':
      return 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
    case 'edge':
      return 'Mozilla/5.0 (Windows IoT 10.0; Android 6.0.1; WebView/3.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/17.17083'
    case 'firefox':
      return 'Mozilla/5.0 (X11; Linux x86_64; rv:73) Gecko/73.0 Firefox/73.0'
  }
}

/**
 * Returns the twitter app iphone data
 * @param {string} url
 * @param {object} [options={}]
 * @returns {Promise<object>}
 */
async function get(url, options = {}) {
  if (!url) {
    throw new Error('URL cannot be empty')
  }

  const userAgent = getUserAgent(options.agent)
  const response = await axios.get(url, {
    headers: {
      'User-Agent': userAgent
    }
  })
  
  const $ = cheerio.load(response.data)
  const data = {
    canonical: getCanonicalURL($),
    prev: getPreviousURL($),
    next: getNextURL($),
    title: getTitle($),
    metaData: getMetaData($),
    openGraph: getOpenGraphData($),
    twitter: getTwitterData($),
    linkedData: getLinkedData($),
  }
  return data
}

module.exports = {
  get 
}
