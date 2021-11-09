import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
// import * as Local from "./Localization";
import { getLanguage, setLanguage } from './Localization'
import { myDirection } from './Localization'
// import * as AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe("Check Localization", () => {

    afterEach(() => {
        jest.resetModules();
        jest.unmock('./constants/AllPath');
    })


    it("should check setting of language", async () => {
        const spy = jest.spyOn(AsyncStorage, 'setItem');
        await setLanguage("hin");
        expect(spy).toBeCalledWith('language', 'hin');
    });
    it("should check getting of language", async () => {
        await setLanguage("hin");
        const spy = jest.spyOn(AsyncStorage, 'getItem');
        await getLanguage();
        expect(spy).toBeCalledWith('language');
    });

    it("should return value from a valid key", async () => {
        jest.mock("./constants/AllPath", () => ({
            default: {
                Paths: {
                    "en": {
                        "description": "Aeyyo Kozou!!"
                    }
                }
            }
        }));
        console.log(AsyncStorage)
        await setLanguage("en")
        console.log("stack--", await getLanguage())
        console.log(await "description".getLocalisedString())
    });
    it("should check error", async () => {
        await setLanguage("hinata");
        await getLanguage()
        expect(AsyncStorage.getItem).rejects
    });
    it("should check direction", async () => {
        expect(myDirection()).toEqual({ start: "left", end: "right" })
        I18nManager.isRTL = true;
        expect(myDirection()).toEqual({ start: "right", end: "left" })

    });

}


);