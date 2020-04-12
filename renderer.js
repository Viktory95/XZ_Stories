/**
 * Created by Vi on 04.04.2020.
 */
const electron = require('electron')
const fs = require('fs')
const path = require('path')
const $ = selector => document.querySelector(selector)
const marked = require('marked')
const Path = require('path');

const dir = './temp_story_files/'

let $chooseStory = $('#choose-story')
let $startStory = $('#start-story')
let $viewStory = $('#view-story')
let $sceneImg = $('#scene-img')
let $topBox = $('#top-box')
let $bottomBox = $('#bottom-box')
let $rightBox = $('#right-box')
let $leftBox = $('#left-box')
let $centerBox = $('#center-box')

let stories = getDirectories(path.resolve(dir))
for(let storyNum = 0; storyNum < stories.length; storyNum++) {
    let option = document.createElement("option")
    option.text = stories[storyNum]
    $chooseStory.append(option)
}

$startStory.addEventListener('click', () => {
    let storyName = $chooseStory.options[$chooseStory.selectedIndex].value
    let fileData = require('./' + dir + storyName + '/' + storyName + '.json')
    if(fileData.story.episodes) {
        for(let episodeNum = 0; episodeNum < fileData.story.episodes.length; episodeNum++) {
            if(fileData.story.episodes[episodeNum].scenes) {
                for(let sceneNum = 0; sceneNum < fileData.story.episodes[episodeNum].scenes.length; sceneNum++) {
                    if(fileData.story.episodes[episodeNum].scenes[sceneNum].isStart) {
                        console.log(fileData.story.episodes[episodeNum].scenes[sceneNum])
                        $viewStory.scene = fileData.story.episodes[episodeNum].scenes[sceneNum]
                        sceneView(storyName, fileData.story.episodes[episodeNum].id,
                            fileData.story.episodes[episodeNum].scenes[sceneNum].id,
                            fileData.story.episodes[episodeNum].scenes[sceneNum].image,
                            fileData.story.episodes[episodeNum].scenes[sceneNum].textPosition,
                            fileData.story.episodes[episodeNum].scenes[sceneNum].text,
                            fileData.story.episodes[episodeNum].scenes[sceneNum].choices)
                        break
                    }
                }
            }
        }
    }
})

function sceneView(storyName, episodeId, sceneId, image, textPosition, text, choices) {
    $topBox.hidden = true
    $bottomBox.hidden = true
    $leftBox.hidden = true
    $rightBox.hidden = true
    $centerBox.hidden = true
    $topBox.html = ''
    $bottomBox.html = ''
    $leftBox.html = ''
    $rightBox.html = ''
    $centerBox.html = ''

    $sceneImg.src = dir + storyName + '/' + image
    switch (textPosition) {
        case 'Top':
            let $topText = document.createElement('div')
            $topText.id = 'top-text'
            $topText.innerText = text
            $topBox.append($topText)
            if(choices.length > 1 || choices[0].text !== 'default') {
                for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
                    let div = document.createElement('div')
                    div.innerText = choices[choiceNum].text
                    div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
                    div.story = storyName
                    div.episodeId = episodeId
                    div.sceneId = sceneId
                    div.nextScene = choices[choiceNum].nextScene
                    $topBox.append(div)
                }
            } else {
                $topBox.story
                $topBox.episodeId = episodeId
                $topBox.sceneId = sceneId
                $topBox.nextScene = choices[0].nextScene
            }
            $topBox.hidden = false
            break
        case 'Bottom':
            let $bottomText = document.createElement('div')
            $bottomText.id = 'bottom-text'
            $bottomText.innerText = text
            $bottomText.append($bottomText)
            if(choices.length > 1 || choices[0].text !== 'default') {
                for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
                    let div = document.createElement('div')
                    div.innerText = choices[choiceNum].text
                    div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
                    div.story = storyName
                    div.episodeId = episodeId
                    div.sceneId = sceneId
                    div.nextScene = choices[choiceNum].nextScene
                    $bottomBox.append(div)
                }
            } else {
                $bottomBox.story
                $bottomBox.episodeId = episodeId
                $bottomBox.sceneId = sceneId
                $bottomBox.nextScene = choices[0].nextScene
            }
            $bottomBox.hidden = false
            break
        case 'Left':
            let $leftText = document.createElement('div')
            $leftText.id = 'left-text'
            $leftText.innerText = text
            $leftText.append($leftText)
            if(choices.length > 1 || choices[0].text !== 'default') {
                for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
                    let div = document.createElement('div')
                    div.innerText = choices[choiceNum].text
                    div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
                    div.story = storyName
                    div.episodeId = episodeId
                    div.sceneId = sceneId
                    div.nextScene = choices[choiceNum].nextScene
                    $leftBox.append(div)
                }
            } else {
                $leftBox.story
                $leftBox.episodeId = episodeId
                $leftBox.sceneId = sceneId
                $leftBox.nextScene = choices[0].nextScene
            }
            $leftBox.hidden = false
            break
        case 'Right':
            let $rightText = document.createElement('div')
            $rightText.id = 'right-text'
            $rightText.innerText = text
            $rightText.append($rightText)
            if(choices.length > 1 || choices[0].text !== 'default') {
                for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
                    let div = document.createElement('div')
                    div.innerText = choices[choiceNum].text
                    div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
                    div.story = storyName
                    div.episodeId = episodeId
                    div.sceneId = sceneId
                    div.nextScene = choices[choiceNum].nextScene
                    $rightBox.append(div)
                }
            } else {
                $rightBox.story
                $rightBox.episodeId = episodeId
                $rightBox.sceneId = sceneId
                $rightBox.nextScene = choices[0].nextScene
            }
            $rightBox.hidden = false
            break
        case 'Center':
            let $centerText = document.createElement('div')
            $centerText.id = 'center-text'
            $centerText.innerText = text
            $centerText.append($centerText)
            if(choices.length > 1 || choices[0].text !== 'default') {
                for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
                    let div = document.createElement('div')
                    div.innerText = choices[choiceNum].text
                    div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
                    div.story = storyName
                    div.episodeId = episodeId
                    div.sceneId = sceneId
                    div.nextScene = choices[choiceNum].nextScene
                    $centerBox.append(div)
                }
            } else {
                $centerBox.story
                $centerBox.episodeId = episodeId
                $centerBox.sceneId = sceneId
                $centerBox.nextScene = choices[0].nextScene
            }
            $centerBox.hidden = false
            break
    }
}

// function moveScenes(scenes) {
//     for(let sceneNum = 0; sceneNum < scenes.length; sceneNum++) {
//         if()
//     }
// }

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
            .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}