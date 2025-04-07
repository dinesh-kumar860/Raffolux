import { capitalizeFirstLetter } from "./CapitalizeFirstLetter"

export default splitName = (name) => {
    if(name.includes(' ')){
        let splitName = name.split(' ')
        return `${capitalizeFirstLetter(splitName[0])} ${capitalizeFirstLetter(splitName[splitName.length-1].trim()[0])}`
    }
    else{
        return name
    }
   
}
