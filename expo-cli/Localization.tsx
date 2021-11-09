import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, NativeModules, I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

const Path = "./constants/AllPath.js";

let direction = {
    start : "left",
    end : "right"
};

export const isRTL = async() => {
    return ( await "RTL".getLocalisedString());
}

export const myDirection = () => {
    if(I18nManager.isRTL)
    {
        return {start:"right",end:"left"}
    }
    return {start:"left",end:"right"}
}

export const setLanguage = async(lName:string) => {
    
    await AsyncStorage.setItem('language',lName);

    if(await isRTL()){
            I18nManager.forceRTL(true);
            direction.start = "right";
            direction.end = "left;"
        }
    else{
            I18nManager.forceRTL(false);
            direction.start = "left";
            direction.end = "right;"
        }
        
    Updates.reloadAsync();
}

export const getLanguage = async () => {
    
    // try{
    //     const AllPath = require(Path);
    //     const v = await AsyncStorage.getItem('language');
        
    //     if(v===null){
    //         await setLanguage('en');
    //         return AllPath.default.Paths['en']
    //     }
    //     return AllPath.default.Paths[v];
    // }catch(err){
    //     console.log(err)
    // }
    try{
        let AllPath = require(Path);
        const v = await AsyncStorage.getItem('language');
        if(v===null){
           let userDefault = getUserDefaultLanguage()
           if(AllPath.default.Paths[userDefault]!==undefined){
               return AllPath.default.Paths[userDefault];
           }else{
               return AllPath.default.Paths['en'];
           }
        }
        return AllPath.default.Paths[v];
    }catch(err){
        console.log(err)
    }
}

export const getUserDefaultLanguage = () => 
{
    return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
}

declare global {
  interface String {
    getLocalisedString(): Promise<string>;
  }
}

String.prototype.getLocalisedString = async function(this:string):Promise<string>
{
    try 
    {
        const langObj = await getLanguage();
        let key: string = this;
        return langObj[key];
    } catch (err) {
        console.log("error: ",err);
        return "error while implementing getLanguage";
    }
} 
