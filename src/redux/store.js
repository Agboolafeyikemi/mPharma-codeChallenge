import {createStore} from 'redux'

let initialState = {}

const rootReducer = (state = initialState, {type, ...rest}) => {
  switch (type){
    case 'UPDATE_DATA':
      return {...state, ...rest}
    default:
      return {...state}

  }
}


console.log("Initial Data: ", initialState)

//api call
const getData = async () => {
  try {
    const result = await (await fetch('https://www.mocky.io/v2/5c3e15e63500006e003e9795' ))
    const data = await result.json()
    if (data.products) {
      return data.products.map((item) => {
        return  {
          id: item.id,
          name: item.name,
          currentPrice: item.prices[0].price,
          prevPrice: item.prices[1].price,
        }          
      })    
    }
  } catch (error) {    
    console.log(error)
  }
}


//useDispatch({type:'UPDATE_DATA', getData()})
const store = createStore(rootReducer)

// getData().then(results => {
//    console.log("Results: ", results)
//    //cacheing in memory for offline use
//    localStorage.setItem('initData', JSON.stringify(results))   
//    } 
// )
// .catch(error =>{
//    console.log(error)
//    const offlineData = localStorage.getItem('initData')   
//    console.log("Inmemory data: ", offlineData)
//   }
// );

let data = []
getData().then(res => data.push(res))
console.log("Payload: ", data)

export default store;
