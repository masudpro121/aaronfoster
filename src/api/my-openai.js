import { Configuration, OpenAIApi } from 'openai'

const openaiApiKey = process.env.REACT_APP_OPENAI_KEY
const configuration = new Configuration({
  apiKey: openaiApiKey
})
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration)




export function createChatCompletion(messages) {
    return openai.createChatCompletion({
      messages,
      model: "gpt-3.5-turbo",
    })
}

export function createCompletion(msg) {
    return openai.createCompletion({
      prompt:msg,
      model: "text-davinci-003",
      max_tokens: 2048
    })
}

