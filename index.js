const fs = require('fs')
const imagePath = './Telegram-Gif'
const pjson = require('./package.json')
const version = pjson.version
const baseUrl = 'https://gcore.jsdelivr.net/npm/telegram-gif@'+version+'/Telegram-Gif'

/**
 * 获取文件名
 * @param {string} name
 */
function getName(name) {
  return name.split('.')[0]
}

/**
 * 生成twikoo格式json文件
 * @param {Array<string>} nameList
 */
function twikoo(nameList) {
  const key = `<img src="${baseUrl}/😘飞吻.gif" style="width: 30px;top: 4px;position: relative;" title="Telegram-Gif">`
  const result = {
    [key]: {
      type: 'image',
      container: []
    }
  }
  nameList.forEach((name) => {
    result[key].container.push({
      icon: `<img src="${baseUrl}/${name}">`,
      text: `Telegram-Gif-${getName(name)}`
    })
  })
  return result
}

/**
 * 生成valine格式json文件
 * @param {Array<string>} nameList
 */
function valine(nameList) {
  const result = {}
  nameList.forEach((name) => {
    result[`${getName(name)}`] = `${baseUrl}/${name}`
  })
  return result
}

/**
 * 生成valine格式json文件
 * @param {Array<string>} nameList
 */
function artalk(nameList) {
  const result = {
    name: 'Telegram-Gif',
    type: 'image',
    items: []
  }
  nameList.forEach((item) => {
    result.items.push({
      key: `heo-${getName(item)}`,
      val: `${baseUrl}/${item}`
    })
  })
  return result
}

/**
 * 生成waline格式json文件
 * @param {Array<string>} nameList
 */
 function waline(nameList) {
  const result = {
    name: 'Telegram-Gif',
    type: 'gif',
    icon: '😘飞吻',
    items: []
  }
  nameList.forEach((item) => {
    result.items.push(`${getName(item)}`)
  })
  return result
}

const fileNameListAll = fs.readdirSync(imagePath)
// 筛选png
const path = require('path');
const EXTENSION = '.gif';

const fileNameList = fileNameListAll.filter(file => {
  return path.extname(file).toLowerCase() === EXTENSION;
});

const twikooObject = twikoo(fileNameList)
fs.writeFileSync('./twikoo.json', JSON.stringify(twikooObject))
const valineObject = valine(fileNameList)
fs.writeFileSync('./valine.json', JSON.stringify(valineObject))
const artalkObject = artalk(fileNameList)
fs.writeFileSync('./artalk.json', JSON.stringify(artalkObject))
const walineObject = waline(fileNameList)
fs.writeFileSync('./Telegram-Gif/info.json', JSON.stringify(walineObject))
