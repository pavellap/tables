const URL_BIG_DATA = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const URL_SMALL_DATA = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

const tableMatch = {
    0: 'big',
    1: 'small'
}

export {URL_BIG_DATA, URL_SMALL_DATA, tableMatch}