import {useEffect, useState} from 'react'
import './App.css'
import Number from "./components/Number.jsx";
import VRange from "./components/Range.jsx";

function App() {
  const [userPrice, setUserPrice] = useState(10_000)

  const [wbCashDiscount, setWbCashDiscount] = useState(4.0)
  const [wbCashPrice, setWbCashPrice] = useState(9_600)

  const [discount, setDiscount] = useState(63.0)
  const [wbDiscount, setWbDiscount] = useState(19.0)
  const [buyPrice, setBuyPrice] = useState(33_367)

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history')) ?? []
  )

  const onChangeUserPrice = (value) => {
    setUserPrice(value)
    setBuyPrice((value / (1 - wbDiscount / 100) / (1 - discount / 100)).ceil())
    setWbCashPrice((value * (1 - wbCashDiscount / 100)).ceil())
  }
  const onChangeBuyPrice = (value) => {
    setBuyPrice(value)
    setUserPrice((value * (1 - wbDiscount / 100) * (1 - discount / 100)).ceil())
    setWbCashPrice(((value * (1 - wbDiscount / 100) * (1 - discount / 100)) * (1 - wbCashDiscount / 100)).ceil())
  }
  const onChangeWbCashPrice = (value) => {
    setWbCashPrice(value)
    setUserPrice((value / (1 - wbCashDiscount / 100)).ceil())
    setBuyPrice(((value / (1 - wbCashDiscount / 100)) / (1 - wbDiscount / 100) / (1 - discount / 100)).ceil())
  }
  const onChangeWbCashDiscount = (value) => {
    setWbCashDiscount(value)
    setWbCashPrice((userPrice * (1 - value / 100)).ceil())
  }
  const onChangeDiscount = (value) => {
    setDiscount(value)
    setBuyPrice((userPrice / (1 - wbDiscount / 100) / (1 - value / 100)).ceil())
  }
  const onChangeWbDiscount = (value) => {
    setWbDiscount(value)
    setBuyPrice((userPrice / (1 - value / 100) / (1 - discount / 100)).ceil())
  }

  useEffect(() => {
    history && localStorage.setItem("history", JSON.stringify(history))
  }, [history]);

  const save = () => {
    const currentTime = new Date().getTime()

    const obj = {
      userPrice,
      wbCashDiscount,
      wbCashPrice,
      discount,
      wbDiscount,
      buyPrice,
      currentTime
    }
    if (!history.find(x => JSON.stringify(x.omit('currentTime')) === JSON.stringify(obj.omit('currentTime')))) {
      setHistory(hst => [...hst, obj])
      console.log('saved')
    }
  }

  const del = (timestamp = 0) => {
    console.log(history, timestamp)
    console.log(history.filter(x => x.currentTime !== timestamp))
    setHistory(hst => hst.filter(x => x.currentTime !== timestamp))
  }

  const select = ({userPrice,wbCashDiscount, wbCashPrice, discount, wbDiscount, buyPrice}) => {
    setUserPrice(userPrice)
    setWbCashDiscount(wbCashDiscount)
    setWbCashPrice(wbCashPrice)
    setBuyPrice(buyPrice)
    setDiscount(discount)
    setWbDiscount(wbDiscount)
  }

  return (
    <div className='d-flex'>
      <div className="app">
        <Number title={"Цена покупателя"} init={userPrice} onChange={onChangeUserPrice}/>
        <VRange className={'purple'} title={"Скидка с ВБ кошельком"}
                init={wbCashDiscount}
                onChange={onChangeWbCashDiscount}/>
        <Number className={'purple'} title={"Цена покупателя с ВБ кошельком"}
                init={wbCashPrice}
                onChange={onChangeWbCashPrice}/>
        <VRange title={"Скидка"} init={discount} onChange={onChangeDiscount}/>
        <VRange title={"Скидка ВБ"} init={wbDiscount} onChange={onChangeWbDiscount}/>
        <Number title={"Цена товара"} init={buyPrice} onChange={onChangeBuyPrice}/>
        <button className='btn btn-primary w-100' onClick={() => save()}>Сохранить в историю</button>
      </div>
      <div className="ms-2 card p-1 history flex-fill mb-0 overflow-scroll" style={{maxHeight: 553}}>
        <p className='text-center fw-bold'>История</p>
        {history && history.map((item, index) => (
          <div key={index} className="card p-1 d-flex flex-row justify-content-between">
            <div className="d-flex flex-column">
              <small>Цена пользователя {item.userPrice}</small>
              <small className="purple-tag">Цена с ВБ кошельком {item.wbCashPrice}</small>
              <small>Цена товара {item.buyPrice} {item.discount}% {item.wbDiscount}%</small>
            </div>
            <div className="d-flex flex-column gap-1">
              <button onClick={() => select(item)} className="btn btn-primary flex-fill d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                  <path fillRule="evenodd"
                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
              </button>
              <button onClick={() => del(item.currentTime)} className="btn btn-danger flex-fill d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-trash3" viewBox="0 0 16 16">
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
