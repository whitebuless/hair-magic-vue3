import axios from 'axios';

axios.create({
  baseURL:"http://localhost:8080/",
  timeout:5500,
  header:{'X-Custom-Header':'foobar'}
})

export {
  axios
}