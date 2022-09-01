const photo = `{
  "type": ["h-entry"],
  "properties": {
    "category": ["gallery-photo"],
    "visibility": ["unlisted"],
    "name": ["Photo title"],
    "photo": ["https://yoursite.com/media/photo.jpg"],
  }
}`

const gallery = `{
  "type": ["h-entry"],
  "properties": {
    "category": ["gallery"],
  },
  "children": ["https://yoursite.com/photopost1", "https://yoursite.com/photopost2"]
}`

export { photo, gallery }
