import axios from 'axios';

export default class TodoService {

  all(callback) {
    axios.get('http://localhost:8080/login')
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
  }

  get(id,callback) {
    axios.get('http://localhost:8080/login/'+id)
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
  }

  add(data,callback) {
    axios.post('http://localhost:8080/login/add/', {
    desc: data
    })
    .then(function (response) {
      console.log(response);
      callback();
    })
    .catch(function (error) {
      console.log(error);
      callback();
    });
  }

  update(data, id, callback){
    axios.post('http://localhost:8080/login/update/'+id, {
      desc: data
    })
    .then(function(response) {
      console.log('Updated');
      callback();
    })
    .catch(function(response) {
      callback();
    });
  }

  delete(id, callback){
    axios.get('http://localhost:8080/login/delete/'+id)
    .then(function(response){
      callback();
    })
    .catch(function(response){
      console.log('Error deleting');
      callback();
    });
  }
}
