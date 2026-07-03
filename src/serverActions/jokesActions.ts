import {createServerFn} from "@tanstack/react-start"

import * as fs from 'node:fs'

import type {JokesData} from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({method:"GET"}).handler(async()=>{
    const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')

    return JSON.parse(jokes) as JokesData
})

type PostJokeDataType = {
    question: string
    answer: string
}

export const addJoke  = createServerFn({method:"POST"}).validator((data:PostJokeDataType)=>{
    if(!data.question){
        throw new Error("Question is required")
    }
    if(!data.answer){
        throw new Error("Answer is required")
    }

    return data
}).handler(async({data})=>{

    const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
    const jokesData = JSON.parse(jokes) as JokesData

    const newJoke = {
        id: Date.now().toString(),
        question: data.question,
        answer: data.answer,
    }

    jokesData.push(newJoke)

    await fs.promises.writeFile(JOKES_FILE, JSON.stringify(jokesData, null, 2), 'utf-8')

    return newJoke
})