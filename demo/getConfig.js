window.config = null

async function getConfig(callback, url = 'config.json') {
  // Fetch the JSON file
  var xobj = new XMLHttpRequest()
  xobj.overrideMimeType("application/json")
  xobj.open('GET', url, true)
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status == 200) {
      try {
        var configData = JSON.parse(xobj.responseText)
        // Fire data to callback
        if (typeof callback === 'function') {
          callback(configData)
        }
      } catch (error) {
        console.error('Tried to parse cumstom configuration led to an error', error)
      }
    } else if (xobj.readyState === 4 && xobj.status != 200){
      console.error('Could not find custom demo configuration script! Please add your "demo/config.json" to make this demo working!')
    }
  }
  xobj.send(null)
}