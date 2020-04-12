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
    $viewStory.addEventListener('click', (e) => {
    })

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
    if($('div[id^=choice-]')) $('div[id^=choice-]').remove()

    $sceneImg.src = dir + storyName + '/' + image
    switch (textPosition) {
        case 'Top':
            sceneTextView($topBox, choices, storyName, episodeId, sceneId, text)
            break
        case 'Bottom':
            sceneTextView($bottomBox, choices, storyName, episodeId, sceneId, text)
            break
        case 'Left':
            sceneTextView($leftBox, choices, storyName, episodeId, sceneId, text)
            break
        case 'Right':
            sceneTextView($rightBox, choices, storyName, episodeId, sceneId, text)
            break
        case 'Center':
            sceneTextView($centerBox, choices, storyName, episodeId, sceneId, text)
            break
    }
}

function sceneTextView($box, choices, storyName, episodeId, sceneId, text) {
    let $topText = document.createElement('div')
    $topText.id = 'top-text'
    $topText.innerText = text
    $box.append($topText)
    if(choices.length > 1 || choices[0].text !== 'default') {
        for(let choiceNum = 0; choiceNum < choices.length; choiceNum++) {
            let div = document.createElement('div')
            div.innerText = (choiceNum + 1) + ')' + choices[choiceNum].text
            div.id = 'choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id
            div.story = storyName
            div.episodeId = episodeId
            div.sceneId = sceneId
            div.nextScene = choices[choiceNum].nextScene
            $box.append(div)

            $('#choice-' + episodeId + '-' + sceneId + '-' + choices[choiceNum].id).addEventListener('click', (e) => {
                moveScenes(e.target.story, e.target.episodeId, e.target.nextScene)
            })
        }
    } else {
        $box.story = storyName
        $box.episodeId = episodeId
        $box.sceneId = sceneId
        $box.nextScene = choices[0].nextScene

        $viewStory.addEventListener('click', (e) => {
            moveScenes($box.story, $box.episodeId, $box.nextScene)
        })
    }
    $box.hidden = false
}

function moveScenes(storyName, episodeId, nextScene) {
    let fileData = require('./' + dir + storyName + '/' + storyName + '.json')
    if(fileData.story.episodes) {
        for(let episodeNum = 0; episodeNum < fileData.story.episodes.length; episodeNum++) {
            if(fileData.story.episodes[episodeNum].scenes
                && fileData.story.episodes[episodeNum].id == episodeId) {
                for(let sceneNum = 0; sceneNum < fileData.story.episodes[episodeNum].scenes.length; sceneNum++) {
                    if(fileData.story.episodes[episodeNum].scenes[sceneNum].id == nextScene) {
                        if(fileData.story.episodes[episodeNum].scenes[sceneNum].choices.length == 1
                            && fileData.story.episodes[episodeNum].scenes[sceneNum].choices[0].text == 'default'
                            && fileData.story.episodes.length > episodeNum + 1) {
                            sceneView(storyName, fileData.story.episodes[episodeNum].id,
                                fileData.story.episodes[episodeNum + 1].scenes[sceneNum].id,
                                fileData.story.episodes[episodeNum + 1].scenes[sceneNum].image,
                                fileData.story.episodes[episodeNum + 1].scenes[sceneNum].textPosition,
                                fileData.story.episodes[episodeNum + 1].scenes[sceneNum].text,
                                fileData.story.episodes[episodeNum + 1].scenes[sceneNum].choices)
                            break
                        } else {
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
    }
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
            .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}