import config from '../config.json';

const url = config.apiUrl;

function objectToFormData(object, formData = new FormData(), name = false) {
    Object.keys(object).forEach((key) => {
      const data = object[key];
      if (name) {
        key = name + '[' + key + ']'
      }
      if (Array.isArray(data)) {
        formData = objectToFormData(data, formData, key)
      } else {
        formData.append(key, data);
      }
    });
    return formData;
  }

export default function api(route, params = {}) {
    const options = {
        method: 'POST',
        body: JSON.stringify(params),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    };

    return new Promise((fulfill, reject) => {
        fetch(url + route, options)
            .then(res => res.json())
            .then(res => res.error ? reject(res.error) : fulfill(res))
            .catch(err => reject(err));
    });
}

export function postMedia(file, data) {
    let request = {
        method: 'POST',
        body: objectToFormData({file: file, ...data}),
    };
    return new Promise((fulfill, reject) => {
        fetch(url + 'media', request)
            .then(res => res.json())
            .then(res => res.error ? reject(res.error) : fulfill(res))
            .catch(err => reject(err));
    });
}