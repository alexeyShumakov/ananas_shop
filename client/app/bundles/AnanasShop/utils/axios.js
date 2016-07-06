import axios from 'axios';
const element = document.querySelector('meta[name="csrf-token"]');
const csrfToken = element && element.getAttribute("content");

export default axios.create({
  headers: { 'X-CSRF-Token': csrfToken }
});
