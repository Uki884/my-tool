import React, { useMemo, useState } from 'react'
import styled from 'styled-components';

const _Container = styled.div`
  margin: 0 24px;
  text-align: left;
`
const StringsToJson = () => {
  const [textsAndKeys, setTextsAndKeys] = useState([{ text: '', key: '' }])
  const [result, setResult] = useState('')

  const updateTextsAndKeys = (type: string, value: any, index: number) => {
    const clonedQuestions = [...textsAndKeys];
    clonedQuestions.splice(index, 1, {
      ...textsAndKeys[index],
      [type]: value
    });
    setTextsAndKeys(clonedQuestions);
  }

  const convertToJson = () => {
    const result = [] as any
    const length = textsAndKeys.filter(item => item.text).length
    for (let i = 0; i < length; i++) {
      const texts = textsAndKeys[i].text.split('\n')
      texts.forEach((text, index) => {
        if (result[index]) {
          result[index][textsAndKeys[i].key] = text
        } else {
          result.push({ [textsAndKeys[i].key]: text })
        }
      })
    }
    setResult(result)
  }

  return (
    <_Container>
      <h2>文字列をJSONの指定のキーに入れる</h2>
      {textsAndKeys.map((textAndKey, index) => {
        return (
          <>
            <h2 key={index + 'string'}>文字列</h2>
            <textarea key={index + 'aa'} value={textAndKey.text} onChange={(e) => updateTextsAndKeys('text', e.target.value, index)} />
            <h2 key={index + 'key'}>キー名</h2>
            <textarea key={index + 'bb'} value={textAndKey.key} onChange={(e) => updateTextsAndKeys('key', e.target.value, index)} />
          </>
        )
      })}
      <button onClick={() => setTextsAndKeys([...textsAndKeys, { key: '', text: '' }])}>増やす</button>
      <div><button onClick={() => convertToJson()}>変換</button></div>
      <h2>結果</h2>
      { JSON.stringify(result, null, 2) }
    </_Container>
  )
}
export default StringsToJson