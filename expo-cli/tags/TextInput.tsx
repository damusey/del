import React, { useState } from 'react'
import { TextInput,I18nManager } from 'react-native'
import { myDirection } from '../Localization';

const isRTL = I18nManager.isRTL;

const MyTextInput = (props:any) => {
    
    const [input, setInput] = useState("");

    const inputHandler = (text:string) => {
        let newInput:string = text;
        if(isRTL)
            {
                if(text.length > input.length)
                    {
                        newInput = text.slice(text.length-1) + input;
                    }
                else {
                        newInput = input.slice(1);
                        console.log('====================================');
                        console.log("1: ",input);
                        console.log("2: ",newInput);
                        console.log('====================================');
                        
                }
            }
        
        setInput(newInput);
}
//    return (
//      <TextInput value={input} onChangeText={inputHandler} style={{...props.style, textAlign: myDirection().start}} >
//          {props.children}
//      </TextInput>
//  )
// }

    return (
        <TextInput value = {input} onChangeText={inputHandler} {...props} style = {{...props.style, textAlign: myDirection().start}} >
            {props.children}
        </TextInput>
    )
}

export default MyTextInput;
